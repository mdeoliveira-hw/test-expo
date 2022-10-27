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
        slug: 'test-expo',
        version: "1.0.0",
        orientation: 'portrait',
        icon: configClient.icon,
        userInterfaceStyle: 'automatic',
        splash: {
            image: './assets/splash.png',
            resizeMode: "contain",
            backgroundColor: "#ffffff"
        },
        updates: {
            fallbackToCacheTimeout: 0
        },
        assetBundlePatterns: [
            "**/*"
        ],
        ios: {
            bundleIdentifier: configClient.bundleId
        },
        android: {
            package: configClient.packageId
        },
        extra: {
            ...config.extra,
            bearer: process.env.BEARER
        }
    }
}

export default config