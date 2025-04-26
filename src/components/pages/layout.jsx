import React from "react";
import {
    VStack,
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "../Header";

const Layout = ({ session }) => {
    return (
        <VStack spacing={0}>
            <Header session={session} />
            <Outlet />
        </VStack>
    );
};

export default Layout;
