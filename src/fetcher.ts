interface Customer { id: number; first_name: string };

export default function doFetch() {
    fetch("https://demo2-back-end.luke-j.com/api/customers")
        .then(response => response.json())
        .then((data: Customer[]) => data.forEach(
            item => {
                console.log(item.first_name)
            }
        ))
        .catch(error => console.error(error))
};