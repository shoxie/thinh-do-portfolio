"use client";

import {
  Block,
  BookCover,
  BookEnd,
  Duo,
  EntryShell,
  Fig,
  LeadSpread,
} from "@/components/book/BookKit";
import { useI18n } from "@/lib/i18n";
import { nextProjectSlug, PROJECTS, PROJECT_COPY } from "@/lib/projectPages";
import { TAOS_COPY, TAOS_IMG, taosCoverContent } from "@/lib/taosBook";

function StageOne() {
  const { lang } = useI18n();
  const stage = TAOS_COPY[lang].stages[0];
  const [unfamiliar, fractured] = stage.blocks;
  return (
    <EntryShell entry={stage}>
      <LeadSpread
        block={stage.lead}
        media={
          <Fig
            m={TAOS_IMG.taos01}
            alt="The character isolated among blurred figures in a monochrome crowd"
            caption="01 / The Weight of Expectation"
          />
        }
      />
      <Block
        block={unfamiliar}
        flip
        media={
          <Fig
            m={TAOS_IMG.taos02}
            alt="The character confronted by his reflection"
            caption="02 / A Self Unfamiliar"
          />
        }
      />
      <Block
        block={fractured}
        media={
          <Fig
            m={TAOS_IMG.taos03}
            alt="The fractured self fading into darkness"
            caption="03 / The Fractured Self"
          />
        }
      />
    </EntryShell>
  );
}

function StageTwo() {
  const { lang } = useI18n();
  const stage = TAOS_COPY[lang].stages[1];
  const [shielded] = stage.blocks;
  return (
    <EntryShell entry={stage} alt>
      <LeadSpread
        block={stage.lead}
        media={
          <Fig
            m={TAOS_IMG.taos04}
            alt="Blue-lit portrait, cigarette smoke drifting from his lips"
            caption="04 / The Dissolution of Feeling"
          />
        }
      />
      <Block
        block={shielded}
        flip
        media={
          <Duo
            a={TAOS_IMG.taos05}
            b={TAOS_IMG.taos06}
            altA="Crouching silhouette shielding himself"
            altB="A guarded gaze peering out from behind his arm"
            capA="05 / Defensive Isolation"
            capB="06 / The Shielded Self"
          />
        }
      />
    </EntryShell>
  );
}

function StageThree() {
  const { lang } = useI18n();
  const stage = TAOS_COPY[lang].stages[2];
  const [anguish, facades] = stage.blocks;
  return (
    <EntryShell entry={stage}>
      <LeadSpread
        block={stage.lead}
        media={
          <Fig
            m={TAOS_IMG.taos07}
            alt="A collapsed figure lying beside mirror shards under amber light"
            caption="07 / Weight of Collapse"
          />
        }
      />
      <Block
        block={anguish}
        flip
        media={
          <Fig
            m={TAOS_IMG.taos08}
            alt="A distorted scream across fractured glass"
            caption="08 / Anatomy of Anguish"
          />
        }
      />
      <Block
        block={facades}
        media={
          <Fig
            m={TAOS_IMG.taos09}
            alt="Mirror shards revealing watchful eyes and tight lips"
            caption="09 / Disjointed Facades"
          />
        }
      />
    </EntryShell>
  );
}

function StageFour() {
  const { lang } = useI18n();
  const stage = TAOS_COPY[lang].stages[3];
  const [voidBlock] = stage.blocks;
  return (
    <EntryShell entry={stage} alt>
      <LeadSpread
        block={stage.lead}
        media={
          <Duo
            a={TAOS_IMG.taos10}
            b={TAOS_IMG.taos11}
            altA="A tear-streaked face in crimson light"
            altB="A blurred figure clutching his head in agony"
            capA="10 / Rupture of Reality"
            capB="11 / Rupture of Reality"
          />
        }
      />
      <Block
        block={voidBlock}
        flip
        media={
          <Fig
            m={TAOS_IMG.taos12}
            alt="A body arched backward in a vast red void"
            caption="12 / Absolute Void"
          />
        }
      />
    </EntryShell>
  );
}

function TaosEnd() {
  const { lang } = useI18n();
  const end = PROJECT_COPY["taos-project"][lang];
  const nextSlug = nextProjectSlug("taos-project");
  return (
    <BookEnd
      back={end.back}
      next={end.next}
      nextHref={nextSlug ? `/projects/${nextSlug}` : undefined}
      nextName={PROJECTS.find((p) => p.slug === nextSlug)?.name}
    />
  );
}

export function TaosBook() {
  return (
    <>
      <BookCover content={taosCoverContent()} coverImg={TAOS_IMG.taos01} />
      <StageOne />
      <StageTwo />
      <StageThree />
      <StageFour />
      <TaosEnd />
    </>
  );
}
