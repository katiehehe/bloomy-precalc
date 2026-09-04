import { useMemo, useState } from "react";
import SiteHeader from "../catalog/SiteHeader";
import MapGraph from "./MapGraph";
import { foundation, incoming, inventory, outgoing, skillHref, skillsFor, topicById, topicLessonHref, topics } from "./data";

export default function CurriculumMap() {
  const [selectedId, setSelectedId] = useState("trig");
  const topic = topicById(selectedId) ?? topics[0]!;
  const topicSkills = skillsFor(topic.id);

  const prereqs = useMemo(
    () =>
      incoming(topic.id).map((edge) => ({
        edge,
        target: topicById(edge.from)!,
      })),
    [topic.id],
  );
  const unlocks = useMemo(
    () =>
      outgoing(topic.id).map((edge) => ({
        edge,
        target: topicById(edge.to)!,
      })),
    [topic.id],
  );

  const ctaHref = topicLessonHref(topic);
  const readyCount = topicSkills.filter((skill) => skill.status === "ready").length;

  return (
    <div className="map">
      <SiteHeader current="map" />
      <div className="map__shell">
        <main className="map__main">
          <header className="map__intro">
            <h1>How to learn precalculus</h1>
            <p>
              The year has {inventory.newSkills} precalculus skills across nine topics, on top of about{" "}
              {inventory.reused} skills already in place from Algebra 2, Geometry, and Statistics. Select a topic to
              see every lesson and the arrows that connect it.
            </p>
          </header>

          <div className="map__toolbar">
            <div className="map-legend" aria-hidden="true">
              <span>
                <span className="map-pip map-pip--ready" />
                Lesson ready
              </span>
            </div>
          </div>

          <div className="map__foundation">
            <p>
              <span>Already in place, about {inventory.reused} skills:</span>
            </p>
            <ul>
              {foundation.map((item) => (
                <li key={item.codes}>
                  {item.lessonId ? (
                    <a href={`#/${item.lessonId}`}>{item.label}</a>
                  ) : (
                    <strong>{item.label}</strong>
                  )}
                  <span>{item.codes}</span>
                </li>
              ))}
            </ul>
          </div>

          <MapGraph selectedId={selectedId} onSelect={setSelectedId} />

          <section className="map-detail" aria-labelledby="map-detail-title">
            <header className="map-detail__head">
              <p className="map-detail__kicker">
                Topic {topic.n} of {topics.length}
                {" · "}
                {topicSkills.length} skills
                {readyCount ? ` · ${readyCount} ${readyCount === 1 ? "lesson" : "lessons"} ready` : ""}
              </p>
              <h2 id="map-detail-title">{topic.title}</h2>
            </header>

            <p className="map-detail__why">{topic.why}</p>

            <div className="map-detail__grid">
              <section>
                <h3>Skills in this topic</h3>
                <ul className="map-skills">
                  {topicSkills.map((skill) => (
                    <li key={skill.id}>
                      <span className={`map-pip map-pip--${skill.status}`} aria-hidden="true" />
                      {skillHref(skill) ? (
                        <a href={skillHref(skill)}>{skill.title}</a>
                      ) : (
                        <span>{skill.title}</span>
                      )}
                      {skill.status === "ready" ? <span className="map-skills__tag">Ready</span> : null}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3>Sits on</h3>
                <p className="map-detail__empty">{topic.fromBank}</p>

                <h3>Depends on</h3>
                {prereqs.length === 0 ? (
                  <p className="map-detail__empty">No other new topic is required first.</p>
                ) : (
                  <ul className="map-links">
                    {prereqs.map(({ edge, target }) => (
                      <li key={edge.from}>
                        <button type="button" onClick={() => setSelectedId(target.id)}>
                          {target.title}
                        </button>
                        {edge.note ? <span>{edge.note}</span> : null}
                      </li>
                    ))}
                  </ul>
                )}

                <h3>Unlocks</h3>
                {unlocks.length === 0 ? (
                  <p className="map-detail__empty">Nothing later waits on this topic.</p>
                ) : (
                  <ul className="map-links">
                    {unlocks.map(({ edge, target }) => (
                      <li key={edge.to}>
                        <button type="button" onClick={() => setSelectedId(target.id)}>
                          {target.title}
                        </button>
                        {edge.note ? <span>{edge.note}</span> : null}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </div>

            {ctaHref ? (
              <a className="btn btn--primary map-detail__cta" href={ctaHref}>
                Open the first lesson
              </a>
            ) : (
              <p className="map-detail__soon">No lesson is linked for this topic.</p>
            )}
          </section>

          <footer className="map__sources">
            <p>
              The map is the full sequence: {inventory.newSkills} skills in nine topics, built on about{" "}
              {inventory.reused} reused from Algebra 2, Geometry, and Statistics. Order follows OpenStax, Sullivan, and
              Stewart: rationals, then trig, then polar, then vectors, parametrics, and conics. Matrices and a calculus
              preview come last because they do not unlock later precalculus.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
