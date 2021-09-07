import React, { useState, useEffect } from "react";
import Add from "./Add";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";
import "./App.css";

function Dashboard(props) {
  const [events, cEvents] = useState([]);
  const [current, cCurrent] = useState(undefined);

  const refreshList = () => {
    props.client.getEvents().then((response) => cEvents(response.data));
  };

  const removeEvent = (id) => {
    props.client.removeEvent(id).then(() => refreshList());
  };

  const updateEvent = (event) => {
    cCurrent(event);
  };

  useEffect(() => {
    refreshList();
  }, []);

  const buildrows = () => {
    return events.map((current) => {
      return (
        <tr key={current._id}>
          <td>{current.name}</td>
          <td>{current.location}</td>
          <td>{current.precis}</td>
          <td>{current.date}</td>
          <td>{current.time}</td>
          <td>
            <Button 
              variant="dark" 
              onClick={() => removeEvent(current._id)}>
                {" "}
              Remove
            </Button>{" "}
            <Button 
              variant="dark"
              onClick={() => updateEvent(current)}> 
              Update</Button>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <h2>Event Dashboard</h2>
      <br />
      <table>
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Location</th>
            <th>Precis</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>{buildrows()}</tbody>
      </table>
      <br />
      <br />
      <Add
        client={props.client}
        refreshList={() => {
          refreshList();
          cCurrent(undefined);
        }}
        currentEvent={current}
      />
    </>
  );
}

export default Dashboard;
