import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Link } from "@inertiajs/react";
import { Book, Code2, Globe, GraduationCap, Search, Video } from "lucide-react";

export default function Welcome() {
    return (
        <div className="flex flex-col min-h-screen max-w-full">
            <header className="border-b px-4">
                <div className="container flex items-center justify-between h-16 gap-4">
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-semibold"
                    >
                        <Code2 className="h-6 w-6" />
                        <span>CodeLearn</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Select defaultValue="en">
                            <SelectTrigger className="w-[120px]">
                                <Globe className="mr-2 h-4 w-4" />
                                <SelectValue placeholder="Language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="en">English</SelectItem>
                                <SelectItem value="es">Español</SelectItem>
                                <SelectItem value="fr">Français</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline">Sign In</Button>
                    </div>
                </div>
            </header>
            <main className="flex-1 max-w-6xl mx-auto">
                <section className="py-12 md:py-24 bg-muted">
                    <div className="md:container px-4 md:px-6">
                        <div className="flex flex-col items-center gap-4 text-center">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-balance">
                                Jifunze ujuzi unaoweza kuleta mabadiliko ya
                                kiteknolojia nchini hata duniani
                            </h1>
                            <p className="max-w-[700px] text-muted-foreground">
                                Tumia programming kutengeneza softwares,
                                websites, Artifical Intelligence, Mobile apps,
                                games n.k. Je unataka kutengeneza nini? Hakuna
                                kinachoshindikana ukijifunza programming, ndiyo
                                maana niko hapa.
                            </p>
                            <div className="w-full max-w-sm space-y-2">
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        className="pl-8"
                                        placeholder="Search tutorials, courses, or topics..."
                                        type="search"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="container px-4 md:px-6 flex flex-col lg:flex-row items-start lg:items-center justify-between p-4 border-t border-gray-200">
                    <div className="flex items-start lg:items-center space-x-4">
                        <img
                            src="./get_started.webp"
                            alt="Bible Image"
                            className="w-20 h-20 object-cover rounded-md"
                        />
                        <div>
                            <a
                                href="#"
                                className="text-blue-600 hover:underline font-semibold"
                            >
                                Makala za kujifunza
                            </a>
                            <p className="text-gray-600">
                                Soma makala mbalimbali kuhusu teknolojia 
                                <i>Lorem issun door met</i>, saloon faith sakkaj.
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 lg:mt-0 flex flex-col items-start lg:items-end space-y-2 lg:space-y-0 lg:ml-4">
                        <p className="text-gray-800 font-medium">
                            Ona video, muziki, makala, na habari zilizoongezwa
                            hivi karibuni.
                        </p>
                        <a
                            href="#"
                            className="bg-blue-600 text-white py-1.5 px-3 rounded hover:bg-blue-700 transition duration-200 inline-flex items-center"
                        >
                            Ni Nini Kipya?
                            <span className="ml-2">&gt;</span>
                        </a>
                    </div>
                </section>

                <section className="py-12 md:py-16">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-4">
                                        <Book className="h-6 w-6" />
                                        <h3 className="font-semibold">
                                            Kuanza
                                        </h3>
                                    </div>
                                    <img
                                        alt="Getting Started"
                                        className="mx-auto my-4 aspect-video rounded-lg object-cover"
                                        height={200}
                                        src="/get_started_sw.webp"
                                        width={400}
                                    />
                                    <p className="text-sm text-muted-foreground">
                                        Maelekezo kuhusu maana ya programming,
                                        Jinsi ya kuanza, na ushauri
                                        utakaokusaidia kuwa programmer mzuri....
                                    </p>
                                </CardContent>
                                <CardFooter className="p-6 pt-0">
                                    <Button
                                        className="w-full"
                                        variant="outline"
                                    >
                                        Anza kujifunza
                                    </Button>
                                </CardFooter>
                            </Card>
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-4">
                                        <Video className="h-6 w-6" />
                                        <h3 className="font-semibold">
                                            Mafunzo ya video
                                        </h3>
                                    </div>
                                    <img
                                        alt="Video Tutorials"
                                        className="mx-auto my-4 aspect-video rounded-lg object-cover"
                                        height={200}
                                        src="/video_tutorial.jpg"
                                        width={400}
                                    />
                                    <p className="text-sm text-muted-foreground">
                                        Angalia kozi za video ambazo
                                        zinakuongoza hatua kwa hatua kujifunza
                                        lugha mabalimbali za compyuta na
                                        framework zake.
                                    </p>
                                </CardContent>
                                <CardFooter className="p-6 pt-0">
                                    <Button
                                        className="w-full"
                                        variant="outline"
                                    >
                                        Anza kozi sasa
                                    </Button>
                                </CardFooter>
                            </Card>
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-4">
                                        <GraduationCap className="h-6 w-6" />
                                        <h3 className="font-semibold">
                                            Njia za kujifunza
                                        </h3>
                                    </div>
                                    <img
                                        alt="Learning Paths"
                                        className="mx-auto my-4 aspect-video rounded-lg object-cover"
                                        height={200}
                                        src="/paths.png"
                                        width={400}
                                    />
                                    <p className="text-sm text-muted-foreground">
                                        Ona njia za kujifunza ili ubobee katika
                                        sehemu maalumu ya programming.
                                    </p>
                                </CardContent>
                                <CardFooter className="p-6 pt-0">
                                    <Button
                                        className="w-full"
                                        variant="outline"
                                    >
                                        Angalia njia
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="border-t py-6">
                <div className="container flex flex-col gap-4 px-4 md:flex-row md:items-center md:gap-8 md:px-6">
                    <div className="flex items-center gap-2">
                        <Code2 className="h-6 w-6" />
                        <span className="font-semibold">CodeLearn</span>
                    </div>
                    <nav className="flex gap-4 md:ml-auto">
                        <Link className="text-sm hover:underline" href="#">
                            About
                        </Link>
                        <Link className="text-sm hover:underline" href="#">
                            Contact
                        </Link>
                        <Link className="text-sm hover:underline" href="#">
                            Terms
                        </Link>
                        <Link className="text-sm hover:underline" href="#">
                            Privacy
                        </Link>
                    </nav>
                </div>
            </footer>
        </div>
    );
}
