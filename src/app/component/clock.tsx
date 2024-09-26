
'use client'


import React, { use } from "react";
import { useState, useMemo, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Clock = () => {
  const [time, setIsTime] = useState<Date>(new Date());
  const [mounted, setIsMounted] = useState<boolean>(false);
  const [is24Hour, setIsTime24Hour] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const interval = setInterval(() => {
      setIsTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [mounted, time, is24Hour]);

  const formattedTime = useMemo<string>(() => {
    if (!mounted) return "";

    const hours = is24Hour
      ? time.getHours().toString().padStart(2, "0")
      : (time.getHours() % 12 || 12).toString().padStart(2, "0");

    const min = time.getMinutes().toString().padStart(2, "0");
    const sec = time.getSeconds().toString().padStart(2, "0");

    return `${hours} : ${min} : ${sec}`;
  }, [mounted, is24Hour, time]);

  return (
    <div className="flex items-center justify-center h-screen w-full bg-slate-50 min-[300px]:p-7">
      <Card className="min-[300px]:p-4 sm:p-5 flex items-center justify-center gap-6 w-[500px] h-auto flex-col pb-8">
        <div>
          <h1 className="text-center sm:text-5xl font-bold mb-2 min-[300px]:text-4xl">Digital Clock</h1>
          <h4 className=" mb-2 text-center">Display current times in hour minutes and seconds</h4>
        </div>
        <div className="flex item-center justify-center">
          <h1 className="min-[300px]:text-4xl sm:text-7xl font-bold text-black text-center">
            {formattedTime}
          </h1>
        </div>
        <div className="flex items-center justify-center flex-row gap-4">
          <Button onClick={()=>{setIsTime24Hour(true)}}>24 Hour Format</Button>
          <Button onClick={()=>{setIsTime24Hour(false)}}>12 Hour Format</Button>
        </div>
      </Card>
    </div>
  );
};

export default Clock;
