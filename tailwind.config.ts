import type { Config } from 'tailwindcss'
import {nextui} from "@nextui-org/react";

const config: Config = {
    mode:'JIT',
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'montserrat': ['Montserrat', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                whiteGray: '#F4F4F5',
                borderGray: '#E1E5EA',
                blackMedium: '#181D25',
                primary: '#7f56d9',
                primarySmall: '#7C3BED',
                primaryDark: '#4D1D95',
                greenLogo: '#21C45D',
                primaryCustom: 'rgba(127, 86, 217, 0.90)',
                primaryBg: 'rgba(127, 86, 217, 0.10)',
                primaryBG: 'rgba(127, 86, 217, 0.15)',
                primaryBGA: 'rgba(124, 59, 237, 0.15)',
                violetLight: '#EBE7FE',
                darkViolet: '#F6F5FF',
                darkViolet700: '#DED7FE',
                violetShadow: 'rgba(137, 90, 246, 0.25)',
                grayCustom: '#929FB1',
                grayLight: '#A1A1AA',
                grayDark: '#D7D7D7',
                grayDarkest: '#231F1F',
                grayPlate: '#98A2B3',
                grayPlateBg: 'rgba(152, 162, 179, 0.15)',
                grayCard: '#EEF0F1',
                grayBg: 'rgba(208, 213, 221, 0.25)',
                greenDark: '#21C45D',
                infoGraphicB:'rgba(206, 208, 255, 0.80)',
                infoGraphicA: 'rgba(206, 234, 255, 0.80)',
                infoGraphicC: 'rgba(242, 206, 255, 0.80)',
                infoGraphicD: 'rgba(255, 206, 227, 0.80)',
                secondary: '#f2eefa',
                summary: '#A689FA',
                tertiary: 'rgba(127, 86, 217, 0.50)',
                warning: '#DC6803',
                warningCustom: 'rgba(220, 104, 3, 0.09)',
                blackCustom:'#1D2939',
                blackMediumC: '#27272A',
                greenLight600: '#16A249',
                grayDark1: '#9B9B9B',
                grayLight2: '#52525B',
                lightBlue: '#CEEAFF',
                lightGreen: '#BBF7D0',
                violetDark: '#C3B4FD',
            },
            fontSize: {
                xsm:'0.625rem'
            },
        },
    },
    darkMode: "class",
    plugins: [nextui()],
}
export default config
