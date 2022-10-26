import { ExpoConfig, ConfigContext } from '@expo/config';
import whiteLabel from "./src/whiteLabel"

const config = ({ config }: ConfigContext): ExpoConfig => {
    const target: string = process.env.CLIENT || 'happywait'
    
    const configClientIndex = Object.entries(whiteLabel).findIndex(([key, value]) => {
        return key === target
    })
    const configClient = Object.entries(whiteLabel)[configClientIndex][1]    

    return {
        ...config,
        name: configClient.name,
        slug: 'my-app',
        icon: configClient.icon,
        ios: {
            bundleIdentifier: configClient.bundleId
        },
        android: {
            package: configClient.packageId
        }
    }
}

export default config