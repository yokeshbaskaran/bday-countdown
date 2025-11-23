const Timer = ({ timeLeft, times }) => {
  return (
    <>
      <main>
        <div className="inside">
          {/*  Title   */}
          <div className="name">
            {/* <h2>Yoki's Birthday in:</h2> */}
            <span class="bday">5 May 2026</span>
            <h2>My Birthday in:</h2>
          </div>
          <div className="time">
            <ul>
              <li>
                <span>{timeLeft.days}</span> days
              </li>
              <li>
                <span>{timeLeft.hours}</span> hours
              </li>
              <li>
                <span>{timeLeft.minutes}</span> minutes
              </li>
              <li>
                <span>{timeLeft.seconds}</span> seconds
              </li>
            </ul>
          </div>
          {/* My Time Zone */}
          <hr style={{ margin: "20px 0" }} />{" "}
          <div className="zone">
            <p className="utc">UTC Timezone: {times.utc} UTC</p>

            <p>
              <strong>Yoki Timezone: </strong> {times.mumbai} IST
            </p>

            <p>
              <strong>Your Browser Timezone: </strong> {times.browser}
            </p>

            <p>
              <strong>New York Timezone: </strong> {times.newyork} UTC-5
            </p>

            <p>
              <strong>London Timezone: </strong> {times.london} UTC+0
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Timer;
