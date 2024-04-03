const userCoins = localStorage.getItem('userData') ? Number(JSON.parse(localStorage.getItem('userData')).coins) : 0;
const listTabs = document.querySelectorAll(".btn-tab");
const userCoinsValue = document.getElementById("userCoins");
const searchParams = new URLSearchParams(window.location.search);
const tab = searchParams.get("tab") ?? "card-themes";
userCoinsValue.innerHTML = `${userCoins}`;
const handleTabDirection = () => {
    listTabs.forEach((button) => {
        if (button.getAttribute("data-tab") === tab) {
            button.classList.add("active");
            button.classList.remove("inactive");
        }
        else {
            button.classList.add("inactive");
            button.classList.remove("active");
        }
        button.addEventListener("click", () => {
            window.location.href = `/shop?tab=${button.getAttribute("data-tab")}`;
        });
    });
};
const vipDetailsContainer = document.getElementById("vipDetails");
vipDetailsContainer.style.visibility = "hidden";
export const handleBuyAction = (postData) => {
    const buyButton = document.getElementById("buyButton");
    buyButton.addEventListener("click", () => {
        fetch("/api/shop", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData),
        }).then((res) => res.json())
            .then((res) => {
            if (res.status === "success") {
                localStorage.setItem("userData", JSON.stringify(res.data));
                window.location.reload();
            }
            else {
                console.log(res.message);
            }
        });
    });
};
handleTabDirection();
