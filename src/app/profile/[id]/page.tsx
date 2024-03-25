export default function UserProfile({params}: any) {
    return(
        <div className="flex justify-center">
            <div>
                <h1>Profile</h1>
                <p>{params.id}</p>
            </div>
        </div>
    )
}