'use client'
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
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


export default function AppTabs({tabContent}: AppTabsProps) {
    const router = useRouter();

    const handleTabChange = (key: React.Key) => {
        const selectedTab = tabContent[key as number];
        router.push(selectedTab.url);
    };
    return (
        <Card>
            <CardBody>
                <Tabs
                    onSelectionChange={handleTabChange}
                    activeKey={router.pathname}
                >
                    {tabContent.map((tab, index) => (
                        <Tab key={index} title={tab.title}>
                            {tab.tabContent}
                        </Tab>
                    ))}
                </Tabs>
            </CardBody>
        </Card>
    )
}
