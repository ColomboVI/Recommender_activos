import React from 'react';
import { LucaTabla } from '../tabla/index';
import './tab.css';

const Tab = () => {
  return (
    <div className="tabset">
      <input type="radio" name="tabset" id="tab1" aria-controls="result" defaultChecked />
      <label htmlFor="tab1">Resultado</label>

      <input type="radio" name="tabset" id="tab2" aria-controls="grafica" />
      <label htmlFor="tab2">Grafica</label>

      <div className="tab-panels">
        <section id="result" className="tab-panel">
          <h2>Resultado</h2>
          {/* <p>
            <strong>Overall Impression:</strong> An elegant, malty German amber lager with a clean,
            rich, toasty and bready malt flavor, restrained bitterness, and a dry finish that
            encourages another drink. The overall malt impression is soft, elegant, and complex,
            with a rich aftertaste that is never cloying or heavy.
          </p>
          <p>
            <strong>History:</strong> As the name suggests, brewed as a stronger “March beer” in
            March and lagered in cold caves over the summer. Modern versions trace back to the lager
            developed by Spaten in 1841, contemporaneous to the development of Vienna lager.
            However, the Märzen name is much older than 1841; the early ones were dark brown, and in
            Austria the name implied a strength band (14 °P) rather than a style. The German amber
            lager version (in the Viennese style of the time) was first served at Oktoberfest in
            1872, a tradition that lasted until 1990 when the golden Festbier was adopted as the
            standard festival beer.
          </p> */}
          <LucaTabla />
        </section>
        <section id="grafica" className="tab-panel">
          <h2>Gráfica</h2>
          <p>
            <strong>Overall Impression:</strong> An elegant, malty German amber lager with a
            balanced, complementary beechwood smoke character. Toasty-rich malt in aroma and flavor,
            restrained bitterness, low to high smoke flavor, clean fermentation profile, and an
            attenuated finish are characteristic.
          </p>
          <p>
            <strong>History:</strong> A historical specialty of the city of Bamberg, in the
            Franconian region of Bavaria in Germany. Beechwood-smoked malt is used to make a
            Märzen-style amber lager. The smoke character of the malt varies by maltster; some
            breweries produce their own smoked malt (rauchmalz).
          </p>
        </section>
      </div>
    </div>
  );
};

export default Tab;
