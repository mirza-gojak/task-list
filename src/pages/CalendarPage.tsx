import type { BadgeProps } from "antd";
import { Badge, Calendar } from "antd";
import Page from "components/Page";
import DataContext from "hooks/DataContext";
import type { Moment } from "moment";
import { FC, useContext } from "react";
import "./calendar-page.css";
import moment from "moment";
import { Priority, Status } from "models/Task";

const getListData = (value: Moment) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: "warning", content: "This is warning event." },
        { type: "success", content: "This is usual event." },
      ];
      break;
    case 10:
      listData = [
        { type: "warning", content: "This is warning event." },
        { type: "success", content: "This is usual event." },
        { type: "error", content: "This is error event." },
      ];
      break;
    case 15:
      listData = [
        { type: "warning", content: "This is warning event" },
        { type: "success", content: "This is very long usual event。。...." },
        { type: "error", content: "This is error event 1." },
        { type: "error", content: "This is error event 2." },
        { type: "error", content: "This is error event 3." },
        { type: "error", content: "This is error event 4." },
      ];
      break;
    default:
  }
  return listData || [];
};

const CalendarPage: FC = () => {
  const { tasks } = useContext(DataContext);

  const mapPriorityToStatus = (priority: Priority): BadgeProps["status"] => {
    if (priority === Priority.Low) return "processing";
    if (priority === Priority.Medium) return "warning";
    else return "error";
  };

  const dateCellRender = (value: Moment) => {
    const listData = tasks.filter(
      (task) =>
        moment(task.dueDate).format("DD.MM.yyyy") === value.format("DD.MM.yyyy")
    );
    return (
      <ul className="events">
        {listData.map((task) => (
          <li key={task.id}>
            <Badge
              status={mapPriorityToStatus(task.priority)}
              text={task.title}
              style={{
                textDecoration:
                  task.status === Status.Completed ? "line-through" : "none",
                color: task.status === Status.Completed ? "gray" : "initial",
              }}
            />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Page>
      <div
        style={{
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
          padding: 20,
          overflow: "auto",
        }}
      >
        <Calendar
          style={{ padding: 20 }}
          dateCellRender={dateCellRender}
          mode="month"
        />
      </div>
    </Page>
  );
};

export default CalendarPage;
