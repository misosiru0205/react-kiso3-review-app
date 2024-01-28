import Loading from "react-loading";

export default function LoadNow() {
  return (
    <section className="Loading">
      <div>
        <Loading
          type="spin"
          color="#ebc634"
          height="100px"
          width="100px"
          className="mx-auto"
        />
        <p className="Loadtext">Loading…</p>
      </div>
    </section>
  );
}
