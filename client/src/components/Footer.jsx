import React, {useState} from 'react';
import {Facebook, Github, Instagram, Mail, MapPin, Phone, Twitter} from "lucide-react";
import {Link} from "react-router-dom";
import logo_white_green from "../assets/logo_white_green.png"
import logo_white from "../assets/logo_white.png"
function Footer(props) {
    return (
        <footer className="bg-gradient-to-r from-green-700 to-green-900 text-white w-full">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-9 pb-5">
                <div className="flex flex-col lg:flex-row justify-between gap-6 lg:gap-4 text-center lg:text-left items-center lg:items-start">
                    {/* Logo & Social Media */}
                    <div>
                        <h3 className="text-2xl font-semibold mb-4 flex items-center justify-center lg:justify-start">
                            <img src={logo_white} alt="logo" className="mr-2" width={52} height={40} />
                            EcoUzbekistan
                        </h3>
                        <p className="mb-4">Sayyoramizni birga asraylik</p>
                        <div className="flex space-x-4 justify-center lg:justify-start">
                            <Link to="#" className="hover:text-green-300 transition-colors">
                                <Facebook />
                            </Link>
                            <Link to="#" className="hover:text-green-300 transition-colors">
                                <Instagram />
                            </Link>
                            <Link to="#" className="hover:text-green-300 transition-colors">
                                <Twitter />
                            </Link>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-xl font-semibold mb-4">Bog'lanish</h4>
                        <ul className="space-y-2">
                            <li className="flex items-center justify-center lg:justify-start">
                                <Mail className="mr-2" size={18} />
                                <a href="mailto:info@ecouzbekistan.uz" className="hover:text-green-300 transition-colors">
                                    info@ecouzbekistan.uz
                                </a>
                            </li>
                            <li className="flex items-center justify-center lg:justify-start">
                                <Phone className="mr-2" size={18} />
                                <a href="tel:+998123456789" className="hover:text-green-300 transition-colors">
                                    +998 12 345 67 89
                                </a>
                            </li>
                            <li className="flex items-center justify-center lg:justify-start">
                                <MapPin className="mr-2" size={18} />
                                <span>Toshkent, O'zbekiston</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="mt-8 pt-2 border-t border-green-600 text-center">
                    <p>&copy; {new Date().getFullYear()} EcoUzbekistan. Barcha huquqlar himoyalangan.</p>
                </div>
            </div>
        </footer>

    );
}

export default Footer;