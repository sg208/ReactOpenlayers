import React from "react"
import { shallow, mount } from "enzyme"
import Header from "./Layouts/Header/Header"
import Footer from "./Layouts/Footer/Footer"

it("renders HEADER without crashing", () => {
    shallow(<Header />);
});

it("renders FOOTER without crashing", () => {
    shallow(<Footer />);
});
