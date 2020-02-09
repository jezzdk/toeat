import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { apps, flash } from 'ionicons/icons'
import Mealplan from './pages/Mealplan'
import Recipes from './pages/Recipes'
import { AppContextProvider } from './State'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import './theme/variables.css'

const App = () => (
  <IonApp>
    <AppContextProvider>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/mealplan" component={Mealplan} exact={true} />
            <Route path="/recipes" component={Recipes} exact={true} />
            <Route path="/" render={() => <Redirect to="/mealplan" />} exact={true} />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/mealplan">
              <IonIcon icon={flash} />
              <IonLabel>Madplan</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/recipes">
              <IonIcon icon={apps} />
              <IonLabel>Opskrifter</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </AppContextProvider>
  </IonApp>
)

export default App
