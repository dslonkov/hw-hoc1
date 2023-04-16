import React, { useState } from 'react';
import moment from 'moment';

function isValidNumber(value) {
  return typeof value === 'number';
}

function isValidDate(value) {
  let isValid = new Date(value);
  return (
    null !== isValid &&
    !isNaN(isValid) &&
    'undefined' !== typeof isValid.getDate
  );
}

function DateTime(props) {
  return <p className="date">{props.date}</p>;
}

function DateTimePretty(Component) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        strTimestamp: null,
      };
    }

    componentDidMount() {
      let now = moment();
      let initialTimestamp = moment(this.props.date);
      let diffDays = now.diff(initialTimestamp, 'days');
      let diffHours = now.diff(initialTimestamp, 'hours');
      let strTimestamp = isValidDate(initialTimestamp)
        ? diffDays > 10
          ? initialTimestamp.format('DD.MM.YYYY H:mm:ss')
          : diffDays > 1
            ? diffDays + ' дн. назад'
            : diffHours > 1
              ? '5 часов назад'
              : '12 минут назад'
        : 'Неправильная дата';
      console.log(strTimestamp);
      this.setState({
        strTimestamp: strTimestamp,
      });
    }
    componentDidUpdate() {}
    componentWillUnmount() {}

    render() {
      // return <Component {...this.props} />;
      return <Component date={this.state.strTimestamp} />;
    }
  };
}

const WrappedDatetime = DateTimePretty(DateTime);

function Video(props) {
  return (
    <div className="video">
      <iframe
        src={props.url}
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
      ></iframe>
      <WrappedDatetime date={props.date} />
    </div>
  );
}

function VideoList(props) {
  return props.list.map((item) => <Video url={item.url} date={item.date} />);
}

export default function App() {
  const [list, setList] = useState([
    {
      url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
      date: 'Неправильная дата',
    },
    {
      url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-03-03 12:10:00',
    },
    {
      url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2022-06-23 17:24:00',
    },
    {
      url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2022-06-24 12:10:00',
    },
    {
      url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2022-06-21 11:11:00',
    },
    {
      url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2017-12-02 05:24:00',
    },
  ]);

  return (
    <>
      <VideoList list={list} />
    </>
  );
}
