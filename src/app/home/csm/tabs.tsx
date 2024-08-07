'use client'
import {Tabs, Tab} from "@nextui-org/react";
import React from "react";
import { useRouter } from 'next/navigation'; // Import useRouter from Next.js

type TabContent = {
    tabContent: React.ReactNode;
    title: string;
    url: string;
}
export interface AppTabsProps {
    tabContent: TabContent[];
}


export default function AppTabs({tabContent, isNew}: AppTabsProps) {
    const router = useRouter();

    const handleTabChange = (key: React.Key) => {
        console.log(isNew);
        if (isNew) {
            return;
        }
        const selectedTab = tabContent[key as number];
        router.push(selectedTab.url);
    };
    return (
        <Tabs
            onSelectionChange={handleTabChange}
            variant="underlined"
        >
            {tabContent.map((tab, index) => (
                <Tab key={index} title={tab.title}>
                    {tab.tabContent}
                </Tab>
            ))}
        </Tabs>
    )
}
