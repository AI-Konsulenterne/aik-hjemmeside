# CTA-sektioner

Reference: `src/components/sections/FinalCTA.tsx`, `src/components/sections/RiskReversal.tsx`, `src/components/sections/SubpageCTA.tsx`.

## Final CTA — slutningen af forsiden

Den sidste sektion før footer. Skal lukke salget.

```tsx
<section className="py-20 md:py-32 bg-black text-white">
  <div className="mx-auto max-w-4xl px-6 md:px-8 text-center">
    <h2 className="tracking-heading text-4xl md:text-6xl font-bold leading-tight mb-6">
      Klar til at se hvad AI kan gøre <br />
      for <span className="text-primary">jeres virksomhed?</span>
    </h2>

    <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
      Book en gratis 45-minutters AI-afklaring. Ingen forpligtelse — og finder vi
      ikke en konkret mulighed der kan spare jer tid, koster det ingenting.
    </p>

    <Button cal size="lg">Book gratis afklaring</Button>

    <p className="mt-6 text-sm text-gray-400">
      Eller ring direkte til Alexander på{" "}
      <a href="tel:+4525547074" className="text-primary hover-underline">
        +45 25 54 70 74
      </a>
    </p>
  </div>
</section>
```

## Risk Reversal — fjerner barriere før beslutning

Placeres typisk lige før den primære booking-CTA.

```tsx
<section className="py-20 md:py-28 bg-gray-50">
  <div className="mx-auto max-w-3xl px-6 md:px-8 text-center">
    <div className="accent-line mx-auto mb-8" />

    <h2 className="tracking-heading text-3xl md:text-5xl font-bold leading-tight mb-6">
      Vores garanti til jer
    </h2>

    <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
      Finder vi ikke <strong>en konkret AI-mulighed</strong> der kan spare jer tid
      i mødet — så koster det jer ingenting. Hverken før eller efter.
    </p>
  </div>
</section>
```

## Subpage CTA — på undersider

Mindre, mere kontekstuel.

```tsx
<section className="py-16 md:py-20">
  <div className="mx-auto max-w-3xl px-6 md:px-8 text-center
                  bg-primary text-black rounded-3xl py-12 md:py-16 px-8">
    <h2 className="text-2xl md:text-3xl font-bold mb-4">
      Lyder dette interessant?
    </h2>
    <p className="text-base md:text-lg mb-8 opacity-90">
      Book et gratis møde — vi viser jer hvordan det kunne se ud hos jer.
    </p>
    {/* Sort knap på orange flade. Orange tekst på hvid knap er 2,13:1. */}
    <Button cal size="lg" variant="dark">
      Book et møde
    </Button>
  </div>
</section>
```

## Regler for CTA-sektioner

1. **Hver side skal have mindst én CTA-sektion** — ofte både midt på og i bunden.
2. **Variér visuelt** mellem CTA-sektioner: en på sort, en på hvid, en på orange. Ikke samme look gentaget.
3. **Konkret forslag, ikke abstrakt.** *"Book gratis afklaring"* slår *"Kontakt os"*.
4. **Risiko-fjernelse i sub-tekst.** Hver CTA-sektion bør røre én af: "gratis", "ingen forpligtelse", "ingen forberedelse".
5. **Ring-til-os altid synlig.** Telefonnummer som fallback under hver primary CTA.

## Konverterings-elementer der altid er synlige

Disse er ikke CTA-sektioner men globale elementer:

- **`PopupPhone`** — modal efter 10 sek (én gang pr. session) med Alexanders direkte nummer.
- **`BottomBar`** — fast bjælke i bunden med 📞 og book-knap. Synlig på mobil hele tiden.
