import React from 'react';

export class TimeTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      longest_total: 0
    };

    props.data.split("\n").forEach(task => {
      var matches = task.match(/(\s*)(-+) (.*)/),
          item = {
            title: matches[3],
            offset: matches[1].length,
            len: matches[2].length
          };

      this.state.items.push(item);

      if (item.offset + item.len > this.state.longest_total) {
        this.state.longest_total = item.offset + item.len;
      }
    });
  }

  render() {
    const time_slots = [...Array(Math.ceil(this.state.longest_total / 5))].map((e, i) => {
      return i * 10;
    });

    return (
      <table className="time-table" cellspacing="0">
        <thead>
          <tr>
            <th></th>
            <th>
              {time_slots.map((minutes, i) => {
                var mins = minutes % 60,
                    hours = Math.floor(minutes / 60);
                return <time className={i % 6 === 0 ? "thicker" : ""}><i></i>{hours}:{mins === 0 ? "00" : mins}</time>
              })}
            </th>
          </tr>
        </thead>

        {this.state.items.map((item, i) => {
          return (
            <tr key={i}>
              <td dangerouslySetInnerHTML={{ __html: item.title.replace(/\s/g, "&nbsp;") }} style={{ width: 1 }}></td>
              <td>
                {time_slots.map((minutes, i) => {
                  return <span className={"time-mark " + ((i + 1) % 6 === 0 ? "thicker" : "")}></span>;
                })}
                <div className="task-item" style={{ left: item.offset * 10, width: item.len * 10 }}></div>
              </td>
            </tr>
          )
        })}
      </table>
    );
  }
}

export default TimeTable;