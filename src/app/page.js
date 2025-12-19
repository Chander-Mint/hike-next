import { notFound } from "next/navigation";
import { getHomeDataFromDB } from "./components/homeApi/HomeData";
import HomeSelector from "@/src/app/(website)/HomeSelector";

export const revalidate = 10;

async function getHomeData() {
  try {
    const data = await getHomeDataFromDB();
    return data;
  } catch (error) {
    console.error("Page: Error fetching data:", error.message);
    return null;
  }
}

export default async function Page() {
  const homeData = await getHomeData();

  if (!homeData) {
    notFound();
  }

  return <HomeSelector homeData={homeData} />;
}