import { ScrollText } from "lucide-react";
import { Link } from "react-router";

const ItemsNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-lg mx-auto text-center">
        <div className="bg-primary/10 rounded-full p-10">
            <ScrollText className="size-16 text-primary" />
        </div>
        <h3 className="text-2xl font-bold">No items yet</h3>
        <p className="text-base-content/70">Ready to start your inventory? Create your first item to get started.</p>
        <Link to={'/add'} className="btn btn-primary">Create Your First Item</Link>
    </div>
  )
}

export default ItemsNotFound