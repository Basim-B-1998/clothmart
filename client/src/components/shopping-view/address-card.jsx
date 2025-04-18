import { Card, CardContent, CardFooter } from "../ui/card"
import { Label } from "../ui/label"

function AddressCard({addressInfo ,handleDeleteAddress,handleEditAddress,setCurrentSelectedAddress}){
  return (
  <Card onClick={setCurrentSelectedAddress ? ()=>setCurrentSelectedAddress(addressInfo) : null }>
    <CardContent className="grid gap-4 p-4">
      <Label>{addressInfo?.address}</Label>
      <Label>{addressInfo?.city}</Label>
      <Label>{addressInfo?.pincode}</Label>
      <Label>{addressInfo?.phone}</Label>
      <Label>{addressInfo?.notes}</Label>
    </CardContent>
    <CardFooter className="p-3 flex justify-between">
      <button onClick={()=>handleEditAddress(addressInfo)}>Edit</button>
      <button onClick={()=>handleDeleteAddress(addressInfo)}>Delete</button>
    </CardFooter>
  </Card>
  )
}


export default AddressCard