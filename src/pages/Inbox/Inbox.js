import React, { useEffect, useState } from "react";
import { Container, Jumbotron } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateBooking } from "../../store/bookings/bookingActions";
import { fetchUserMessages, sendMessage } from "../../store/messages/messageActions";
import { newMessageCount, selectMessagesSortedByDate } from "../../store/messages/messageSelectors";
import { selectUser } from "../../store/userLogin/userLoginSelectors";
import "./Inbox.css";

function Inbox() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userId = user.id;
  const messages = useSelector(selectMessagesSortedByDate);
  const newMessages = useSelector(newMessageCount);
  const [openMessages, setOpenMessages] = useState([]);
  const [replyMessages, setReplyMessages] = useState([]);
  const [reply, setReply] = useState({
    userId: "",
    recipientUserId: "",
    title: "",
    content: "",
    date: "",
  });

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserMessages(userId));
    }
  }, [dispatch, userId]);

  const newMessage = {
    background: "#5CB85C",
  };

  const oldMessage = {
    background: "#C1272D",
  };

  const acceptBooking = (bookingId) => () => {
    dispatch(updateBooking(bookingId));
  };

  const openMessageToggle = (messageId) => {
    if (openMessages.includes(messageId)) {
      const updatedMessages = openMessages.filter((x) => x.id === messageId);
      setOpenMessages([...updatedMessages]);
    } else {
      setOpenMessages([...openMessages, messageId]);
    }
  };

  const replyMessageToggle = (messageId) => {
    if (replyMessages.includes(messageId)) {
      const updatedMessages = replyMessages.filter((x) => x.id === messageId);
      setReplyMessages([...updatedMessages]);
    } else {
      setReplyMessages([...replyMessages, messageId]);
    }
  };
  const replyInputActive = (messageId, x) => () => {
    if (x) {
      setReply({
        bookingId: x.booking.id,
        userId: x.recipientUserId,
        recipientUserId: x.userId,
        title: `Reply to booking #${x.booking.id} - ${x.title}`,
        date: x.date,
      });
    }

    replyMessageToggle(messageId);
  };

  const sendReply = (reply, messageId) => (e) => {
    console.log("REPLY SENT");
    if (e.key === "Enter") {
      dispatch(sendMessage(reply));
    }
  };

  return (
    <div className="Inbox">
      <Jumbotron>
        <h1>Inbox</h1>
      </Jumbotron>
      <Container>
        <div className="Inbox-message-wrapper">
          <div className="Inbox-message-header">
            <div>from:</div>
            <div>
              <i className="las la-envelope la-2x"></i>
              {newMessages} new messages
            </div>
          </div>
          {messages?.map((x) => {
            return (
              <div style={x.new ? newMessage : oldMessage} key={x.id} className="Inbox-message">
                <h5 className="Inbox-message-title">{x.title}</h5>
                <p className="Inbox-message-sender">
                  from: {x.user.firstName} {x.user.lastName}
                </p>
                {!openMessages.includes(x.id) ? (
                  <div className="Inbox-message-content">
                    {`${x.content?.slice(0, 60)}...`}
                    <div style={{ cursor: "pointer" }} onClick={() => openMessageToggle(x.id)}>
                      Read more...
                    </div>
                  </div>
                ) : (
                  <div className="Inbox-message-content">
                    {x.content}
                    <div style={{ cursor: "pointer" }} onClick={() => openMessageToggle(x.id)}>
                      close
                    </div>
                  </div>
                )}

                <div className="Inbox-message-btn-wrapper">
                  {!x.booking.accepted ? (
                    <button onClick={acceptBooking(x.booking.id)} className="Inbox-message-btn">
                      Accept Booking
                    </button>
                  ) : (
                    <button onClick={acceptBooking(x.booking.id)} className="Inbox-message-btn">
                      Cancel Booking
                    </button>
                  )}

                  <button className="Inbox-message-btn" onClick={replyInputActive(x.id, x)}>
                    Reply
                  </button>
                  <button className="Inbox-message-btn">Delete</button>
                </div>
                {replyMessages.includes(x.id) && (
                  <input
                    className="Inbox-message-reply"
                    onChange={(e) => setReply({ ...reply, content: e.target.value })}
                    onKeyPress={sendReply(reply, x.id)}
                    placeholder="write a reply..."
                    type="text"
                  />
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}

export default Inbox;