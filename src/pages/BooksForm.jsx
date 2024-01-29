import { useForm } from "react-hook-form"


function BooksForm(props){

const {register,handleSubmit,formState:{errors}} = useForm({reValidateMode:"onSubmit",criteriaMode:"all"})

function onSubmit(data){
    props.onSubmit(data)
}

    return (
        
        <>
        <p>{props.errormessage}</p>
        <form onSubmit={handleSubmit(onSubmit)} className="ReviewForm">
          <label>
            タイトル{errors.title && `:${errors.title.message}`}
            <input
              className="ReviewForm__Title"
              defaultValue = {props.response && props.response.title}
              type="text"
              {...register("title", {
                required: { value: true, message: "入力が必須の項目です。" },
              })}
            />
          </label>
          <label>
            URL{errors.url && `:${errors.url.message}`}
            <input
              className="ReviewForm__url"
              defaultValue = {props.response && props.response.url}
              type="text"
              {...register("url", {
                required: { value: true, message: "入力が必須の項目です。" },
              })}
            />
          </label>
          <label>
            詳細{errors.detail && `:${errors.detail.message}`}
            <textarea
              className="ReviewForm__detail"
              defaultValue = {props.response && props.response.detail}
              type="textarea"
              {...register("detail", {
                required: { value: true, message: "入力が必須の項目です。" },
              })}
            />
          </label>
          <label>
            レビュー内容{errors.review && `:${errors.review.message}`}
            <textarea
              className="ReviewForm__review"
              defaultValue = {props.response && props.response.review}
              type="textarea"
              {...register("review", {
                required: { value: true, message: "入力が必須の項目です。" },
              })}
            />
          </label>
          <input type="submit" value="送信"/>
          {props.deleteReview && <input type="button" value="レビュー削除" onClick={()=>props.deleteReview()}/>} 
        </form></>
    )
}

export default BooksForm