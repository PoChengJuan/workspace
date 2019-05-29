import { observable, action } from "mobx";

class UserInfoStore {
    @observable name = "";
    @observable shopName = "";
    @observable permission = 0;

    @action.bound Login(){
        this.name = "Test"
        this.shopName = "TestShop"
        this.permission = 9
    }
}

export default new UserInfoStore()