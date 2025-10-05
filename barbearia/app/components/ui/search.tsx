"use client";

import { Input } from "./input";
import { Button} from "./button";
import { SearchIcon } from "lucide-react";

const Search = () => {
    return ( 
        <div className="flex items-center gap-2">
            <Input placeholder="Busque por uma barbearia..." />
            <Button variant="default">
                <SearchIcon size={20} />
            </Button>
        </div>
     );
}
 
export default Search;