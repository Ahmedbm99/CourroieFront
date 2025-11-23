import Api from "./Api";

const FeedbackService= {

    async addFeedback(data){
        return Api().post("/feedback",data);
    }

}

export default FeedbackService;
