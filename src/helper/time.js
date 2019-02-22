import moment from "moment";

export const getHumanizedTime = (timestamp) => {
    var time = moment(timestamp, "YYYY-MM-DD HH:mm:ss").utc(3).local();
    var ctime = moment.duration(time.diff(moment()), "milliseconds").humanize();
    return ctime;
}
