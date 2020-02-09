import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react'
import React from 'react'
import { useContext } from 'react'
import moment from 'moment'
import { AppContext } from '../State'

const Mealplan = () => {
  const { state, dispatch } = useContext(AppContext)

  const { mealplan } = state

  const generateMealplan = () => {
    dispatch({
      type: 'setMealplan',
      payload: {
        startDate: moment(),
        numDays: 7
      }
    })
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Madplan</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {mealplan.length > 0 ? (
          <div>
            {mealplan.map((m) => (
              <IonCard key={m.key}>
                <IonCardHeader>
                  <IonCardSubtitle>{m.date.format('YYYY-MM-DD')}</IonCardSubtitle>
                  <IonCardTitle>{m.recipe.name}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <p>
                    {m.recipe.summary}
                  </p>
                </IonCardContent>
              </IonCard>
            ))}
          </div>
        ) : (
          <IonCard>
            <IonCardHeader>
              <IonCardSubtitle>Kom igang</IonCardSubtitle>
              <IonCardTitle>Velkommen til!</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p>
                Du har ingen aktiv madplan. Klik på denne knap for at oprette.
              </p>
              <IonButton onClick={generateMealplan}>
                Heyoooo
              </IonButton>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  )
}

export default Mealplan
