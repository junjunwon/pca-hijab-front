// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import '@/assets/styles/main.scss'
import '@/assets/styles/app-button.scss'

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify(
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
    {
        theme: {
            defaultTheme: 'light',
        }
    }
)
