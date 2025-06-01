<template>
  <div class="about">
    <div class="container">
      <h1 class="mb-4">O nás</h1>
      
      <div class="row mb-2">
        <div class="col-md-7">
          <p class="lead">Jsme spolek vodáků z Hronova, který sdružuje nadšence do vodáctví a přírody.</p>
          <p>Naše historie sahá do roku 1970, kdy byl spolek založen skupinou nadšených vodáků. Od té doby se věnujeme organizaci vodáckých výprav, školení a společenských akcí pro naše členy i veřejnost.</p>
          <p>Spolek VODÁCI HRONOV z.s. má svoji základnu na břehu řeky Metuje mezi fotbalovým stadionem a obchodem Penny. Naší členskou základnu tvoří příznivci vodáckého sportu všech věkových kategorií z širokého okolí. Během roku pořádáme sjezdy řek různých obtížností, a to v okolí města Hronova, tak i po celé České republice či v zahraničí. Právě letní prázdninové domácí i zahraniční akce, tvoří nosný program naší činnosti a jsou vyvrcholením každoroční vodácké sezóny. I v dnešní moderní uspěchané době se stále snažíme dodržovat nepsaný kodex o úctě k přírodě a ostatním lidem. K tomu vedeme mladou generaci a nové příchozí vodáky, kteří si s námi užívají legraci i adrenalin na řekách a ostatních společných akcích. Výchovu mladé vodácké generace, má ve své náplni náš oddíl mládeže TOM 3802 Lotři Hronov.</p>  
        </div>
        <div class="col-md-5 mt-3">
          <img src="../assets/photos/foto_1.jpg" alt="Vodáci Hronov - skupina" class="img-fluid rounded shadow" />
        </div>
      </div>

      <div class="row mb-2">
        <div class="col-12">
          <h2>Statut Spolku</h2>
          <p>VODÁCI HRONOV z.s. je samosprávný a dobrovolný svazek členů, fyzických osob, provozující sportovní, tělovýchovnou a hospodářskou činnost, která směřuje zejména k rozvoji a tělesné a psychické zdatnosti jeho členů. VODÁCI HRONOV z.s. je ve smyslu ustanovení § 214 násl. zák. 89/2012 Sb., občanský zákoník, právnickou osobou způsobilou k právnímu jednání.</p>
        </div>
      </div>

      <div class="row mb-2">
        <div class="col-12">
          <h2>Předmět činnosti</h2>
          <p>Účelem spolku je vytvářet podmínky k provozování sportu, tělovýchovy, turistiky a dalších volnočasových aktivit včetně osvětové a hospodářské činnosti.</p>
        </div>
      </div>

      <div class="row mb-5">
        <div class="col-12">
          <h2>Naše cíle</h2>
          <div class="row g-4 mt-3">
            <div class="col-md-4">
              <div class="card h-100">
                <div class="card-body">
                  <img src="@/assets/photos/about_1.png" alt="Vodácké aktivity" class="img-fluid rounded mb-3" style="max-height: 200px; width: 100%; object-fit: cover;">
                  <h5 class="card-title">Vodácké aktivity</h5>
                  <p class="card-text">Organizujeme pravidelné výpravy po českých i zahraničních řekách a pořádáme vodácké kurzy pro začátečníky i pokročilé.</p>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card h-100">
                <div class="card-body">
                  <img src="@/assets/photos/about_2.png" alt="Společenské akce" class="img-fluid rounded mb-3" style="max-height: 200px; width: 100%; object-fit: cover;">
                  <h5 class="card-title">Společenské akce</h5>
                  <p class="card-text">Pořádáme setkání, přednášky a workshopy pro naše členy a příznivce vodáctví či dalších outdoorových sportů.</p>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card h-100">
                <div class="card-body">
                  <img src="@/assets/photos/about_3.png" alt="Ochrana přírody" class="img-fluid rounded mb-3" style="max-height: 200px; width: 100%; object-fit: cover;">
                  <h5 class="card-title">Outdoorové aktivity</h5>
                  <p class="card-text">Pořádáme outdoorové aktivity pro naše členy a příznivce vodáctví či dalších outdoorových sportů.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <h2>Přidejte se k nám</h2>
          <p>Máte zájem o vodáctví a chcete se stát členem našeho spolku? Kontaktujte nás nebo se přijďte podívat na některou z našich akcí.</p>
          <router-link to="/kontakt" class="btn btn-primary btn-lg">Kontaktovat nás</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Component logic here
</script>

<style scoped>
.card {
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-5px);
}

.fas {
  display: block;
}
</style> 