import { observable, computed, action, decorate } from "mobx";

class UserInfoStore {
    name = "";
     shopName = "";
     permission = 0;

    Login(){
        this.name = "Test"
        this.shopName = "TestShop"
        this.permission = 9
    }

}
decorate(UserInfoStore,{
    name : observable,
    shopName : observable,
    permission : observable,
    Login : action
})
export default new UserInfoStore()