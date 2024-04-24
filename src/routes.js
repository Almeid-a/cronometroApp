import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './pages/home'
import Tempos from './pages/tempos'

import { Ionicons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator();

export function Routes(){
    return(
        <Tab.Navigator screenOptions={{ 
            tabBarLabelStyle: { 
                color: 'black', 
                fontSize: 17, 
                fontWeight: 'bold' 
            },
            tabBarStyle: {
                height: 60
            },
            }}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, size, color }) => {
                        if(focused){
                            return <Ionicons size={30} color={'black'} name='home' />
                        }

                        return <Ionicons size={30} color={'black'} name='home-outline' />
                    }
                }}
            />

            <Tab.Screen
                name="Meus Tempos"
                component={Tempos}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, size, color }) => {
                        if(focused){
                            return <Ionicons size={35} color={'black'} name='alarm' />
                        }
                        
                        return <Ionicons size={35} color={'black'} name='alarm-outline' />
                    }
                }}
            />
        </Tab.Navigator>
    )
}