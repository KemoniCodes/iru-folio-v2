import Hero from "@/components/Services/Hero"
import ServicesMenu from "@/components/Services/ServicesMenu"
import Contact from "../components/Home/Contact"

export default function services() {
    return (
        <>
            <div className="services w-full lg:pb-0 pb-80">
                <Hero />
                <ServicesMenu />
            </div>
            <Contact />
        </>
    )
}