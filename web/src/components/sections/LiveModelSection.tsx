import FadeIn from "@/components/ui/FadeIn";
import LiveModel from "@/components/ui/LiveModel";

/**
 * Modellen, lige under filmen.
 *
 * Siden solgte AI og viste aldrig noget. Kundecasen længere nede viser en
 * agent arbejde, men den er et eksempel med færdige svar. Det her er det
 * eneste sted hvor der faktisk regnes noget: 337 vægte der starter
 * tilfældigt og bliver til noget der kan skelne to spiraler, mens man ser
 * på det. Ingen video, intet loop af noget optaget.
 *
 * Den ligger som nummer to på siden med vilje. Heroen siger hvem vi har
 * bygget til; det her siger at vi ved hvad vi laver. Den rækkefølge er
 * bedre end omvendt, fordi påstanden om kunder skal komme fra kunderne og
 * påstanden om håndværk skal kunne ses.
 */
export default function LiveModelSection() {
  return (
    <section className="section-y relative overflow-hidden">
      <div
        aria-hidden="true"
        className="amber-cast amber-cast-soft left-1/2 top-[-14rem] h-[44rem] w-[44rem] -translate-x-1/2"
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10">
        <FadeIn>
          <div className="flex items-center gap-3">
            <span className="lamp" data-lit="true" aria-hidden="true" />
            <p className="kicker text-gray-600">Kører nu, i din browser</p>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-end lg:gap-20">
            <h2 className="max-w-[17ch] text-[clamp(2rem,3.6vw,3.25rem)] font-bold leading-[1.02] tracking-display text-gray-900">
              Den kan ingenting. Om ti sekunder kan den kende forskel.
            </h2>
            <div>
              <p className="max-w-[48ch] text-base leading-relaxed text-gray-600">
                Der ligger 337 tal i den, og de er tilfældige når den starter.
                Den gætter på hvert af de 220 punkter, måler hvor galt det
                gik, og skubber alle 337 tal en anelse den vej der gør det
                mindre galt. Så gør den det igen. Og igen.
              </p>
              <p className="mt-5 max-w-[48ch] text-base leading-relaxed text-gray-600">
                Grænsen mellem de to farver er ikke tegnet af os. Den er
                modellens eget svar, og den bøjer sig fordi den bliver ved med
                at tage fejl indtil den ikke gør.
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={120}>
          <div className="mt-12 lg:mt-16">
            <LiveModel />
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <p className="mt-12 max-w-[62ch] border-t border-gray-200 pt-8 text-base leading-relaxed text-gray-600">
            Jeres opgave er ikke to spiraler. Men mekanikken er den samme,
            uanset om det der skal skelnes er fakturaer, supporthenvendelser
            eller hvilke ordrer der plejer at gå galt. Forskellen er hvad
            man giver den at kigge på, og det er den svære del.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
