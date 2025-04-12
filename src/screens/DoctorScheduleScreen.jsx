import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { Calendar } from "react-native-big-calendar";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import moment from "moment";
import axiosConfig from "../apis/axiosConfig";
import { useNavigation } from "@react-navigation/native";

// Di chuyển các hằng số ra ngoài component
const HOSPITAL_COLORS = {
  backgrounds: ["#0165e1", "#0FAF00", "#FFCDD2"],
  borders: ["#00FC26", "#F44336", "#F44336"],
};

// Component chính - sử dụng React.memo để tối ưu render
const DoctorScheduleScreen = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState("week");
  const [doctorSchedule, setDoctorSchedule] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState({ page: 1, hasMore: true });

  // Cache cho hospital color mapping
  const hospitalColorMapRef = useRef({});

  // Tham chiếu cho việc kiểm soát gọi API trùng lặp
  const isLoadingRef = useRef(false);
  const abortControllerRef = useRef(null);

  // Chuẩn bị các tham số ngày để query API
  const getDateRange = useCallback(() => {
    const now = new Date();
    const startDate = new Date(now);
    startDate.setMonth(now.getMonth() - 1); // 1 tháng trước

    const endDate = new Date(now);
    endDate.setMonth(now.getMonth() + 2); // 2 tháng sau

    return {
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
    };
  }, []);

  // Fetch dữ liệu từ API với phân trang và giảm thiểu data
  const fetchDoctorSchedule = useCallback(
    async (page = 1, refresh = false) => {
      if (isLoadingRef.current) {
        // Hủy request trước đó nếu có request mới
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
      }

      try {
        isLoadingRef.current = true;
        setLoading(true);

        // Tạo abort controller mới để có thể hủy request
        abortControllerRef.current = new AbortController();

        const { startDate, endDate } = getDateRange();
        const limit = 100; // Limit số lượng kết quả trả về mỗi lần

        const response = await axiosConfig.get(
          "/doctor-schedules/get-all-schedule",
          {
            params: {
              startDate,
              endDate,
              page,
              limit,
            },
            signal: abortControllerRef.current.signal,
          }
        );

        const { schedules, pagination } = response.data;

        const hasMore = pagination.currentPage < pagination.totalPages;
        setPageInfo({ page, hasMore });

        // Xử lý dữ liệu
        const events = processScheduleData(schedules, refresh);

        // Cập nhật state
        if (refresh) {
          setDoctorSchedule(events);
        } else {
          setDoctorSchedule((prevEvents) => [...prevEvents, ...events]);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          Alert.alert(
            "Lỗi",
            "Không thể tải lịch làm việc. Vui lòng thử lại sau."
          );
        }
      } finally {
        isLoadingRef.current = false;
        setLoading(false);
      }
    },
    [getDateRange]
  );

  // Xử lý dữ liệu schedule - tách ra thành hàm riêng để code gọn gàng
  const processScheduleData = useCallback((data, refresh) => {
    const hospitalColorMap = refresh ? {} : { ...hospitalColorMapRef.current };
    let hospitalIndex = 0;
    const events = [];

    data.forEach((item) => {
      const [year, month, day] = item.date.split("T")[0].split("-").map(Number);
      const [startHour, startMinute] = item.start_time.split(":").map(Number);
      const [endHour, endMinute] = item.end_time.split(":").map(Number);

      // Xử lý màu cho bệnh viện
      if (!hospitalColorMap[item.hospital.name]) {
        hospitalColorMap[item.hospital.name] = {
          backgroundColor:
            HOSPITAL_COLORS.backgrounds[
              hospitalIndex % HOSPITAL_COLORS.backgrounds.length
            ],
          borderColor:
            HOSPITAL_COLORS.borders[
              hospitalIndex % HOSPITAL_COLORS.borders.length
            ],
        };
        hospitalIndex++;
      }

      // Thêm sự kiện chính
      events.push({
        id: item.id, // Thêm id để xác định sự kiện duy nhất
        title: `${item.hospital.name} - ${
          item.shift_type === "morning" ? "Ca sáng" : "Ca chiều"
        } - ${startHour}:${startMinute || "00"} - ${endHour}:${endMinute || "00"}`,
        start: new Date(year, month - 1, day, startHour, startMinute || 0),
        end: new Date(year, month - 1, day, endHour, endMinute || 0),
        hospital: item.hospital.name,
        shift: item.shift_type,
        backgroundColor: hospitalColorMap[item.hospital.name].backgroundColor,
        borderColor: hospitalColorMap[item.hospital.name].borderColor,
        borderWidth: 2,
      });

      // Thêm các lịch hẹn đã đặt
      if (item.appointmentSlots && item.appointmentSlots.length > 0) {
        item.appointmentSlots.forEach((slot) => {
          const [slotStartHour, slotStartMinute] = slot.start_time
            .split(":")
            .map(Number);
          const [slotEndHour, slotEndMinute] = slot.end_time
            .split(":")
            .map(Number);

          events.push({
            id: `slot_${slot.id}`, // Unique ID for slots
            title: `${slotStartHour}:${slotStartMinute || "00"} - ${slotEndHour}:${slotEndMinute || "00"}`,
            start: new Date(
              year,
              month - 1,
              day,
              slotStartHour,
              slotStartMinute || 0
            ),
            end: new Date(
              year,
              month - 1,
              day,
              slotEndHour,
              slotEndMinute || 0
            ),
            color: "red",
            backgroundColor: "#ff2000",
            borderWidth: 1,
          });
        });
      }
    });

    // Cập nhật cache màu bệnh viện
    hospitalColorMapRef.current = hospitalColorMap;

    return events;
  }, []);

  // Load dữ liệu lần đầu và làm mới
  const refreshData = useCallback(() => {
    fetchDoctorSchedule(1, true);
  }, [fetchDoctorSchedule]);

  // Load thêm dữ liệu khi cần
  const loadMoreData = useCallback(() => {
    if (pageInfo.hasMore && !isLoadingRef.current) {
      fetchDoctorSchedule(pageInfo.page + 1);
    }
  }, [fetchDoctorSchedule, pageInfo]);

  // Xử lý thay đổi ngày trên calendar
  const handleDateChange = useCallback(
    (date) => {
      // Kiểm tra xem có cần load thêm dữ liệu không
      const currentDate = moment(date);
      const lastEvent =
        doctorSchedule.length > 0
          ? doctorSchedule[doctorSchedule.length - 1].start
          : null;

      if (lastEvent) {
        const lastEventDate = moment(lastEvent);
        const diffDays = currentDate.diff(lastEventDate, "days");

        // Nếu ngày hiện tại gần với ngày cuối cùng trong danh sách, load thêm
        if (diffDays > -14 && pageInfo.hasMore) {
          loadMoreData();
        }
      }

      setCalendarDate(date);
    },
    [doctorSchedule, loadMoreData, pageInfo.hasMore]
  );

  // Load dữ liệu ban đầu
  useEffect(() => {
    refreshData();

    return () => {
      // Cleanup: hủy request khi unmount
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [refreshData]);

  // Memoize các hàm xử lý sự kiện - tránh re-render
  const eventCellStyle = useCallback(
    (event) => ({
      backgroundColor: event.backgroundColor,
      borderColor: event.borderColor,
      borderRadius: 5,
    }),
    []
  );

  const handlePressDateHeader = useCallback((date) => {
    setSelectedDate(new Date(date));
    setMode("day");
  }, []);

  const handleGoToToday = useCallback(() => {
    setSelectedDate(new Date());
  }, []);

  const handleToggleVisible = useCallback(() => {
    setVisible((prev) => !prev);
  }, []);

  const handleModeChange = useCallback((newMode) => {
    return () => {
      setMode(newMode);
      setVisible(false);
    };
  }, []);

  // Memoize các giá trị tính toán
  const headerStyle = useMemo(
    () => ({
      height: mode === "day" || mode === "3days" || mode === "week" ? 60 : 30,
    }),
    [mode]
  );

  const overlapOffsetValue = useMemo(
    () => (mode === "week" ? 10 : mode === "3days" ? 30 : 40),
    [mode]
  );

  // Format date hiển thị
  const formattedYear = useMemo(
    () => (calendarDate ? moment(calendarDate).format("YYYY") : ""),
    [calendarDate]
  );

  const formattedMonth = useMemo(
    () => (calendarDate ? moment(calendarDate).format("MM") : ""),
    [calendarDate]
  );

  const todayDay = useMemo(() => moment(new Date()).format("DD"), []);

  // Tách các component con để tối ưu render
  const ViewModeSelector = React.memo(() => (
    <View style={{ paddingBottom: 10 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          paddingHorizontal: 16,
        }}
      >
        {[
          { mode: "month", icon: "calendar-month", label: "Tháng" },
          { mode: "week", icon: "calendar-week", label: "Tuần" },
          { mode: "3days", icon: "calendar-range", label: "3 ngày" },
          { mode: "day", icon: "calendar-today", label: "Ngày" },
        ].map(({ mode: viewMode, icon, label }) => (
          <TouchableOpacity
            key={viewMode}
            style={{
              flexDirection: "column",
              alignItems: "center",
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
            onPress={handleModeChange(viewMode)}
          >
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={mode === viewMode ? "#0165e1" : "#000"}
            />
            <Text
              style={{
                fontWeight: "300",
                color: mode === viewMode ? "#0165e1" : "#000",
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  ));

  // Tách header thành component riêng
  const CalendarHeader = React.memo(() => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 5,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "500" }}>
          {`${formattedYear} Tháng ${formattedMonth}`}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <TouchableOpacity
          style={{
            padding: 10,
          }}
          onPress={handleToggleVisible}
        >
          <FontAwesome name="calendar" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </View>
  ));

  // Component cho nút "Today"
  const TodayButton = React.memo(() => (
    <TouchableOpacity
      style={{
        backgroundColor: "#4995F9",
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: 10,
        right: 20,
        zIndex: 1000,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
      onPress={handleGoToToday}
    >
      <Text style={{ color: "#fff", fontSize: 20, fontWeight: "400" }}>
        {todayDay}
      </Text>
    </TouchableOpacity>
  ));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", paddingTop: 35 }}>
      {loading && doctorSchedule.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
          }}
        >
          <ActivityIndicator size="large" color="#0165fc" />
          <Text>Đang tải...</Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <CalendarHeader />

          {visible && <ViewModeSelector />}

          <Calendar
            events={doctorSchedule}
            height={600}
            mode={mode}
            eventCellTextColor="#fff"
            locale="vi"
            minHour={6}
            maxHour={22}
            onSwipeEnd={handleDateChange}
            eventCellStyle={eventCellStyle}
            headerContainerStyle={headerStyle}
            overlapOffset={overlapOffsetValue}
            showTime={false}
            date={selectedDate}
            onPressDateHeader={handlePressDateHeader}
            showVerticalScrollIndicator={false}
          />

          {/* Hiển thị loading indicator khi load thêm dữ liệu */}
          {loading && doctorSchedule.length > 0 && (
            <View
              style={{
                position: "absolute",
                bottom: 60,
                left: 0,
                right: 0,
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="small" color="#0165fc" />
            </View>
          )}

          <TodayButton />
        </View>
      )}
    </SafeAreaView>
  );
};

export default React.memo(DoctorScheduleScreen);
