import { toast } from "sonner";

export const copyToClipboard = (content: string) =>{
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard!");

}

// export const togglePrivateKeyVisibility = (index: number, visiblePrivateKeys ,setVisiblePrivateKeys:(show:string) => void) =>{
//     setVisiblePrivateKeys(
//         visiblePrivateKeys.map((visible:string, i: number) => (i === index ? !visible : visible))
//     );
// }