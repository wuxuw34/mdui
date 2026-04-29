import moment from "moment";
import { MButton, MIconButton } from "../../button";
import "./date.scss";
import { useState } from "react";
import clsx from "clsx";

interface Date {
  year: number;
  month: number;
  date: number;
  id?: string;
}

export default function MDatePicker() {
  const [currentDate, setCurrentDate] = useState<Date>({
    year: moment().year(),
    month: moment().month(),
    date: moment().date(),
  });
  const [activeDate, setActiveDate] = useState<Date>({
    year: moment().year(),
    month: moment().month(),
    date: moment().date(),
  });
  const [month, setMonth] = useState<number>(moment().month());
  const [year, setYear] = useState<number>(moment().year());

  const getDaysByMonth = (year: number, month: number) => {
    return moment([year, month]).daysInMonth();
  };

  const getDate = (year: number, month: number) => {
    const arr: Date[][] = [];
    const days = getDaysByMonth(year, month);
    const firstDayWeek = moment([year, month]).startOf("month").day(); // 第一天是周几
    const lastDayWeek = moment([year, month]).endOf("month").day(); // 最后一天是周几

    let temp: Date[] = [];
    if (firstDayWeek !== 0) {
      const prevMonthDays = getDaysByMonth(year, month - 1);
      for (let i = 0; i < firstDayWeek; i++) {
        temp.push({
          year,
          month: month - 1,
          date: prevMonthDays + i - firstDayWeek + 1,
          id: `${year}-${month}-${prevMonthDays + i - firstDayWeek + 1}`,
        });
      }
    }
    for (let i = 0; i < days; i++) {
      temp.push({
        year,
        month,
        date: i + 1,
        id: `${year}-${month}-${i + 1}`,
      });
      if (temp.length === 7) {
        arr.push(temp);
        temp = [];
      }
    }
    if (lastDayWeek !== 6) {
      console.log("最后一天", lastDayWeek);
      for (let i = 0; i < 6 - lastDayWeek; i++) {
        temp.push({
          year,
          month: month + 1,
          date: i + 1,
          id: `${year}-${month}-${i + 1}`,
        });
      }
    }
    arr.push(temp);
    return arr;
  };

  const getDayState = (
    year: number,
    month: number,
    date: number,
  ): "text" | "outlined" | "filled" => {
    if (
      year === activeDate.year &&
      month === activeDate.month &&
      date === activeDate.date
    ) {
      return "filled";
    } else if (
      year === currentDate.year &&
      month === currentDate.month &&
      date === currentDate.date
    ) {
      return "outlined";
    }

    return "text";
  };

  return (
    <div className="mdui-date-picker">
      <div className="mdui-date-picker__header">
        <div className="mdui-date-picker__month">
          <MIconButton
            variant="icon"
            size="xs"
            onClick={() => {
              setMonth((pre) => {
                return pre - 1;
              });
            }}
          >
            <span className="material-icons">keyboard_arrow_left</span>
          </MIconButton>
          <MButton
            variant="text"
            size="xs"
            endIcon={<span className="material-icons">arrow_drop_down</span>}
          >
            {month}
          </MButton>
          <MIconButton
            variant="icon"
            size="xs"
            onClick={() => {
              setMonth((pre) => {
                return pre + 1;
              });
            }}
            shape="rounded"
          >
            <span className="material-icons">keyboard_arrow_right</span>
          </MIconButton>
        </div>
        <div className="mdui-date-picker__year">
          <MIconButton
            variant="icon"
            size="xs"
            onClick={() => {
              setYear((pre) => {
                return pre - 1;
              });
            }}
          >
            <span className="material-icons">keyboard_arrow_left</span>
          </MIconButton>
          <MButton
            variant="text"
            size="xs"
            endIcon={<span className="material-icons">arrow_drop_down</span>}
          >
            {year}
          </MButton>
          <MIconButton
            variant="icon"
            size="xs"
            shape="rounded"
            onClick={() => {
              setYear((pre) => {
                return pre + 1;
              });
            }}
          >
            <span className="material-icons">keyboard_arrow_right</span>
          </MIconButton>
        </div>
      </div>
      <div className="mdui-date-picker__content">
        <table className="mdui-date-picker__content-table">
          <thead>
            <tr>
              <th>日</th>
              <th>一</th>
              <th>二</th>
              <th>三</th>
              <th>四</th>
              <th>五</th>
              <th>六</th>
            </tr>
          </thead>
          <tbody>
            {getDate(year, month).map((week) => {
              return (
                <tr key={week[0].id}>
                  {week.map((day) => (
                    <td key={day.id}>
                      <div
                        className={clsx("day", {
                          "not-current-month":
                            day.month !== month && day.year === year,
                        })}
                      >
                        <MButton
                          variant={getDayState(day.year, day.month, day.date)}
                          animation={false}
                          size="sm"
                          shape="rounded"
                          aspectRatio="square"
                          onlyColor={true}
                          onClick={() => {
                            setActiveDate((pre) => ({
                              ...pre,
                              year: day.year,
                              month: day.month,
                              date: day.date,
                            }));
                          }}
                        >
                          {day.date}
                        </MButton>
                      </div>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mdui-date-picker__footer">
        <MButton
          variant="text"
          size="sm"
        >
          取消
        </MButton>
        <MButton
          variant="text"
          size="sm"
        >
          确定
        </MButton>
      </div>
    </div>
  );
}
