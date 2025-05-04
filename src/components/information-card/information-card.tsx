import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
interface Props {
  title: string;
  description: string;
  buttonText: string;
  image: string;
  href: string;
}

export default function InformationCard({
  title,
  description,
  buttonText,
  image,
  href,
}: Props) {
  return (
    <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription className="line-clamp-3 break-words h-14">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          <div className="relative">
            <Image
              src={image}
              alt="Panel de administración"
              width={1920}
              height={1080}
              className="object-contain"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" size="lg" asChild>
          <Link href={href}>
            {buttonText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
