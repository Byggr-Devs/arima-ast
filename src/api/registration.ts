interface props {
    ownerName: string,
    vehicleModel: string,
    vehicleNumber: string,
    phoneNumber: string,
    serviceRequired: string, //dropdown
    extraServiceRequired: boolean,
}
// api to post. Create a registration.
export async function register() {

}

export async function getRegistrationParams() {
   interface resultFormat {
    services: string[],
    priorities: string[],
   }
   const result: resultFormat = fetch(""); 
}