
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Dialog } from "../ui/dialog";
import ShoppingOrderDetailsView from "./order-details";
import { useState } from "react";




function ShoppingOrders(){

const [openDetailsDialog,setopenDetailsDialog] = useState(false)

  return <Card>
    <CardHeader>
      <CardTitle>Order History</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Order Status</TableHead>
            <TableHead>Order Price</TableHead>
            <TableHead>
              <span className="sr-only">Details</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>123456</TableCell>
            <TableCell>11/3/2024</TableCell>
            <TableCell>In Process</TableCell>
            <TableCell>$999 </TableCell>
            <TableCell>
              <Dialog open={openDetailsDialog} onOpenChange={setopenDetailsDialog}>
              <button onClick={()=>setopenDetailsDialog(true)}>View Details</button>
              <ShoppingOrderDetailsView/>
              </Dialog>

            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
}

export default ShoppingOrders