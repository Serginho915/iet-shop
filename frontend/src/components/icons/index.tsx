import React from 'react'

export const IconBag = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
)

export const IconUser = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
)

export const IconChevronDown = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="m6 9 6 6 6-6" />
    </svg>
)

export const IconMapPin = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
)

// UK flag (English)
export const IconFlagUK = ({ className = "w-full h-full" }: { className?: string }) => (
    <svg
        width="100%"
        height="100%"
        viewBox="0 0 60 30"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        style={{ borderRadius: '50%', flexShrink: 0 }}
    >
        <rect width="60" height="30" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
)

// Bulgarian flag
export const IconFlagBG = ({ className = "w-full h-full" }: { className?: string }) => (
    <svg
        width="100%"
        height="100%"
        viewBox="0 0 60 30"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        style={{ borderRadius: '50%', flexShrink: 0 }}
    >
        <rect width="60" height="10" fill="#fff" />
        <rect y="10" width="60" height="10" fill="#00966E" />
        <rect y="20" width="60" height="10" fill="#D62612" />
    </svg>
)

export const IconLightbulb = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 18C9.45 18 8.97933 17.8043 8.588 17.413C8.19667 17.0217 8.00067 16.5507 8 16V14.75C7.05 14.1 6.31267 13.2667 5.788 12.25C5.26333 11.2333 5.00067 10.15 5 9C5 7.05 5.67933 5.396 7.038 4.038C8.39667 2.68 10.0507 2.00067 12 2C13.9493 1.99933 15.6037 2.67867 16.963 4.038C18.3223 5.39733 19.0013 7.05133 19 9C19 10.15 18.7373 11.2293 18.212 12.238C17.6867 13.2467 16.9493 14.084 16 14.75V16C16 16.55 15.8043 17.021 15.413 17.413C15.0217 17.805 14.5507 18.0007 14 18H10ZM10 16H14V13.7L14.85 13.1C15.5333 12.6333 16.0627 12.0377 16.438 11.313C16.8133 10.5883 17.0007 9.81733 17 9C17 7.61667 16.5123 6.43767 15.537 5.463C14.5617 4.48833 13.3827 4.00067 12 4C10.6173 3.99933 9.43833 4.487 8.463 5.463C7.48767 6.439 7 7.618 7 9C7 9.81667 7.18767 10.5877 7.563 11.313C7.93833 12.0383 8.46733 12.634 9.15 13.1L10 13.7V16ZM10 22C9.71667 22 9.47933 21.904 9.288 21.712C9.09667 21.52 9.00067 21.2827 9 21V20H15V21C15 21.2833 14.904 21.521 14.712 21.713C14.52 21.905 14.2827 22.0007 14 22H10Z" fill="currentColor" />
    </svg>
)

export const IconHelpBtn = ({ className }: { className?: string }) => (
    <svg width="78" height="55" viewBox="0 0 78 55" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="76" height="53" rx="23" stroke="black" strokeWidth="2" />
        <path d="M23.9814 38.453C24.0195 38.453 25.0985 38.2166 29.8891 35.5199C40.6683 29.4521 48.0243 21.8808 50.4873 19.1339C51.46 18.0491 51.9598 17.6744 52.3972 17.2904C55.1074 14.9108 38.234 20.1294 36.815 20.7292C33.2191 22.249 51.968 15.8039 52.6089 16.6185C52.3452 20.6051 52.9664 27.5022 53.5097 30.9499C53.6313 31.5948 53.8221 32.3414 54.0186 33.282" stroke="black" strokeWidth="2" strokeLinecap="round" />
    </svg>
)
export const IconGoogle = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335" />
    </svg>
)

export const IconArrowLeft = ({ className }: { className?: string }) => (
    <svg width="12" height="16" viewBox="0 0 12 16" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M9.4181 1C6.88323 2.95714 3.00545 6.9494 1.64272 8.62127C1.32004 9.01714 1.02756 9.4021 1.01389 9.83342C2.94138 11.6293 6.61428 12.9453 8.30198 14.0073C8.74469 14.2871 9.21642 14.567 10.0139 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
)

export const IconArrowRight = ({ className }: { className?: string }) => (
    <svg width="12" height="16" viewBox="0 0 12 16" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M1.59597 1C4.13084 2.95714 8.00862 6.9494 9.37135 8.62127C9.69403 9.01714 9.98651 9.4021 10.0002 9.83342C8.07269 11.6293 4.39979 12.9453 2.71209 14.0073C2.26938 14.2871 1.79764 14.567 1.00018 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
)
export const IconArrowDown = ({ className }: { className?: string }) => (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M15.0002 1.59578C13.043 4.13065 9.05078 8.00844 7.37892 9.37117C6.98304 9.69384 6.59809 9.98632 6.16677 10C4.37091 8.0725 3.0549 4.39961 1.99289 2.7119C1.71308 2.26919 1.4332 1.79746 1.00018 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
)

export const IconExternalLink = ({ className }: { className?: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)
export const IconClock = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
)

export const IconLocation = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 14.5125C10.525 13.1125 11.6562 11.8407 12.3937 10.6972C13.1312 9.55375 13.5 8.538 13.5 7.65C13.5 6.2875 13.0658 5.172 12.1973 4.3035C11.3288 3.435 10.263 3.0005 9 3C7.737 2.9995 6.6715 3.434 5.8035 4.3035C4.9355 5.173 4.501 6.2885 4.5 7.65C4.5 8.5375 4.86875 9.55325 5.60625 10.6972C6.34375 11.8412 7.475 13.113 9 14.5125ZM8.475 15.9C8.3 15.8375 8.14375 15.7438 8.00625 15.6188C7.19375 14.8688 6.475 14.1375 5.85 13.425C5.225 12.7125 4.70325 12.022 4.28475 11.3535C3.86625 10.685 3.5475 10.0413 3.3285 9.42225C3.1095 8.80325 3 8.2125 3 7.65C3 5.775 3.60325 4.28125 4.80975 3.16875C6.01625 2.05625 7.413 1.5 9 1.5C10.587 1.5 11.984 2.05625 13.191 3.16875C14.398 4.28125 15.001 5.775 15 7.65C15 8.2125 14.8907 8.80325 14.6722 9.42225C14.4537 10.0413 14.135 10.685 13.716 11.3535C13.297 12.022 12.775 12.7125 12.15 13.425C11.525 14.1375 10.8063 14.8688 9.99375 15.6188C9.85625 15.7438 9.7 15.8375 9.525 15.9C9.35 15.9625 9.175 15.9938 9 15.9938C8.825 15.9938 8.65 15.9625 8.475 15.9ZM10.0598 8.55975C10.3533 8.26575 10.5 7.9125 10.5 7.5C10.5 7.0875 10.3533 6.7345 10.0598 6.441C9.76625 6.1475 9.413 6.0005 9 6C8.587 5.9995 8.234 6.1465 7.941 6.441C7.648 6.7355 7.501 7.0885 7.5 7.5C7.499 7.9115 7.646 8.26475 7.941 8.55975C8.236 8.85475 8.589 9.0015 9 9C9.411 8.9985 9.76425 8.85175 10.0598 8.55975Z" fill="black" />
    </svg>
)

export const IconInfinity = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M10.5 7.06275C11.1285 6.43125 11.8447 6 12.75 6C13.5456 6 14.3087 6.31607 14.8713 6.87868C15.4339 7.44129 15.75 8.20435 15.75 9C15.75 9.79565 15.4339 10.5587 14.8713 11.1213C14.3087 11.6839 13.5456 12 12.75 12C9.375 12 8.625 6 5.25 6C4.45435 6 3.69129 6.31607 3.12868 6.87868C2.56607 7.44129 2.25 8.20435 2.25 9C2.25 9.79565 2.56607 10.5587 3.12868 11.1213C3.69129 11.6839 4.45435 12 5.25 12C6.15525 12 6.8715 11.5688 7.5 10.9373" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>

)

export const IconCalendar = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M11.25 15C9.575 15 8.15625 14.4187 6.99375 13.2562C5.83125 12.0937 5.25 10.675 5.25 9C5.25 7.3375 5.83125 5.92175 6.99375 4.75275C8.15625 3.58375 9.575 2.9995 11.25 3C12.9125 3 14.3283 3.5845 15.4973 4.7535C16.6663 5.9225 17.2505 7.338 17.25 9C17.25 10.675 16.6658 12.0937 15.4973 13.2562C14.3288 14.4187 12.913 15 11.25 15ZM11.25 13.5C12.5 13.5 13.5625 13.0625 14.4375 12.1875C15.3125 11.3125 15.75 10.25 15.75 9C15.75 7.75 15.3125 6.6875 14.4375 5.8125C13.5625 4.9375 12.5 4.5 11.25 4.5C10 4.5 8.9375 4.9375 8.0625 5.8125C7.1875 6.6875 6.75 7.75 6.75 9C6.75 10.25 7.1875 11.3125 8.0625 12.1875C8.9375 13.0625 10 13.5 11.25 13.5ZM12 8.7V6.75C12 6.5375 11.928 6.3595 11.784 6.216C11.64 6.0725 11.462 6.0005 11.25 6C11.038 5.9995 10.86 6.0715 10.716 6.216C10.572 6.3605 10.5 6.5385 10.5 6.75V9.01875C10.5 9.11875 10.522 9.21575 10.566 9.30975C10.61 9.40375 10.663 9.48175 10.725 9.54375L12.4313 11.25C12.5813 11.4 12.7595 11.475 12.966 11.475C13.1725 11.475 13.3505 11.4 13.5 11.25C13.6495 11.1 13.7245 10.922 13.725 10.716C13.7255 10.51 13.6505 10.3317 13.5 10.1812L12 8.7ZM2.25 6.75C2.0375 6.75 1.8595 6.678 1.716 6.534C1.5725 6.39 1.5005 6.212 1.5 6C1.4995 5.788 1.5715 5.61 1.716 5.466C1.8605 5.322 2.0385 5.25 2.25 5.25H3.75C3.9625 5.25 4.14075 5.322 4.28475 5.466C4.42875 5.61 4.5005 5.788 4.5 6C4.4995 6.212 4.4275 6.39025 4.284 6.53475C4.1405 6.67925 3.9625 6.751 3.75 6.75H2.25ZM1.5 9.75C1.2875 9.75 1.1095 9.678 0.966003 9.534C0.822503 9.39 0.750503 9.212 0.750003 9C0.749503 8.788 0.821503 8.61 0.966003 8.466C1.1105 8.322 1.2885 8.25 1.5 8.25H3.75C3.9625 8.25 4.14075 8.322 4.28475 8.466C4.42875 8.61 4.5005 8.788 4.5 9C4.4995 9.212 4.4275 9.39025 4.284 9.53475C4.1405 9.67925 3.9625 9.751 3.75 9.75H1.5ZM2.25 12.75C2.0375 12.75 1.8595 12.678 1.716 12.534C1.5725 12.39 1.5005 12.212 1.5 12C1.4995 11.788 1.5715 11.61 1.716 11.466C1.8605 11.322 2.0385 11.25 2.25 11.25H3.75C3.9625 11.25 4.14075 11.322 4.28475 11.466C4.42875 11.61 4.5005 11.788 4.5 12C4.4995 12.212 4.4275 12.3902 4.284 12.5347C4.1405 12.6792 3.9625 12.751 3.75 12.75H2.25Z" fill="black" />
    </svg>
)
