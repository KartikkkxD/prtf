"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Requested albums
// Western Row
const WESTERN_ROW = [
  { id: "WESTERN_1", src: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/09/7d/b0/097db06f-8403-3cf7-7510-139e570ca66b/196871341882.jpg/600x600bb.jpg", artist: "Travis Scott", title: "Utopia" },
  { id: "WESTERN_2", src: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/30/66/90/306690d4-2a29-402e-e406-6b319ce7731a/886447227169.jpg/600x600bb.jpg", artist: "Travis Scott", title: "Astroworld" },
  { id: "WESTERN_3", src: "https://upload.wikimedia.org/wikipedia/en/6/6a/PartyNextDoor_and_Drake_-_Some_Sexy_Songs_4_U.png", artist: "Drake", title: "$ome $exy $ongs 4 u" },
  { id: "WESTERN_4", src: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/9f/93/b1/9f93b168-f7f4-5520-449c-0a4140c29052/00850498007537.rgb.jpg/600x600bb.jpg", artist: "J. Cole", title: "4 Your Eyez Only" },
  { id: "WESTERN_5", src: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/31/f8/f1/31f8f122-4989-adc9-c2af-967ce3930564/197342277563_cover.jpg/600x600bb.jpg", artist: "Jackboys", title: "Jackboys" },
  { id: "WESTERN_6", src: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/fe/b6/46/feb64670-4fe7-bbc0-1101-c5f11bfb6905/196871937399.jpg/600x600bb.jpg", artist: "Future & Metro Boomin", title: "We Don't Trust You" },
  { id: "WESTERN_7", src: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/37/da/7c/37da7cc5-2b6f-9bb8-30ba-8a8c3be3e16a/00602527584973.rgb.jpg/600x600bb.jpg", artist: "Kanye West", title: "My Beautiful Dark Twisted Fantasy" },
  { id: "WESTERN_8", src: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/c9/ca/6b/c9ca6b51-87a9-4a13-d37f-24535687023d/23UMGIM63882.rgb.jpg/600x600bb.jpg", artist: "Metro Boomin", title: "Spider-Man: Across the Spider-Verse" },
  { id: "WESTERN_9", src: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/00/c1/dd/00c1dd09-3f86-7288-01dc-63b9f4262f57/075679599377.jpg/600x600bb.jpg", artist: "Don Toliver", title: "E85" },
  { id: "WESTERN_10", src: "https://i.scdn.co/image/ab67616d0000b273240b49b7795e0611ccf416b7", artist: "PARTYNEXTDOOR", title: "Come and See Me" },
  { id: "WESTERN_11", src: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/af/04/83/af048357-131d-1ca3-fe8a-d7ef3dda68ec/24UM1IM04062.rgb.jpg/600x600bb.jpg", artist: "The Weeknd & Playboi Carti", title: "Timeless" },
  { id: "WESTERN_13", src: "data:image/png;base64,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", artist: "Playboi Carti", title: "I Am Music" }
];

// DHH Row
const DHH_ROW = [
  { id: "DHH_1", src: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMWFhUWFx0bGRgYFxoaGhoaHxcXGBgXGxodHSggGxolHRcaITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGxAQGy8mICUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAAABwEBAAAAAAAAAAAAAAAAAQIDBAUGBwj/xABEEAABAwIDBQUECAQEBQUAAAABAAIRAyEEEjEFBkFRYRMicYGRMqGx8AcUQlJiwdHhI3KC8RYzkrIVQ1OToiRVY8LT/8QAGwEAAgMBAQEAAAAAAAAAAAAAAQMAAgQFBgf/xAA0EQACAgEDAgMFBgYDAAAAAAAAAQIRAwQSITFBE1FxBSIyYbFCgZGh0fAUFTPB4fFSYtL/2gAMAwEAAhEDEQA/AIWQJD29F1d26eGykQZ5zoq2nuKzNJeI6LetRE5j000c4NOU2+gusu3Ww7RAYHO/GTHuS6W67Dd2VvRjQPfqh/ERLfwsjjtTDu5IU9nvcbZiuz1d3sKxpLmT11Kq6G1MJQnJSjqRLj5k2CnjX0QfA2/Eznbd1sTwpPv+E/oi/wAO4gCTTc0Di6Gj1dC6C7eCvVJNPJSaOLyAPU6+QWY27tKq4kOqMdHFoBnzy/FGMptgkoJGQdZC3JSK0k3mUgUk0UVz/wDO/pH5rTYF0OYeRCymKOWt5N+JC0eGrC0rz+s/qs9Rof6MfQ2bHQ2eiJjoEnV1/JV+ExGYQD49FOqkASTwWQ1DmDp53ydG3KdJU+lRFOgDPeqfDVQJRaopGVtldtsSwD8Q/NK2xQy7OaOL6s+QaR+SLapuxvM/sPinN96gFLD0wbBrjb+kT6hy06ON5UZdfKsLOfGhc3QFEhLdTOoKQXFd6jgWKA5pWUckV4QJQCiRh6bBcwei0+7L8OJD2tE/a4+XJZaiwkwAtnu5ug+r3n91vXXyS51XIyF3wa/ZO2sM0CnSERyGv7qS/aVV8ilT0tJNkWzd3KVEgtEnmeH7q3yACw05LM2uxpV9zNDYlSqSa77HgCrTAbFo0h3GieZF1YPqDj6JFNw5HzQtkpEf6n/L6BBTc/REpYSrw+1aBGY1AOh1VZtPedlM9wB3IyfgsXnKQXTqtiwRs5z1UmqNns7eYVTlqZGjhMhWNfb1GkP8zP0F/eucZYR3UeCLZI6qSRq9pb7SCKbAOpv7lk8ftatUjM/TSwt4WskvpykGkeSZHHGPQXLLKXVjAxTiZNzzRudOqNzDySHU1cpYh9IdE0aXRPupwmajwAXGwHVBtJWy0U5OkZzeFmWq0/hH+4p+htGf2SatF1epmA7ug8FZYfZOW8eUQuBqMkZzbR6jSYpwxpMDcfH2T6lLp7WIIkkAcyT8Vpd1diUqxIcD0umt5t1jRcHsu06rPwanNXtvkjt3ok95xgWAH7J5u8LAbk3HG/xRYPZZImPRMYzZkQcoN+PFV4L7Q34ztKgLTIEBSN7nEOps+5RYPMy8/wC73K82Vu3h8Qw1KQNKoNWAy2dZHEA+5U++9I/WX9cv+1q3aBLxfuOR7RyXj2/My0p6lQLrAe5W+zN261aC1hI5wum7vbvClTAfAd+EAEecSV1Z5VE5cMbkc42XudXrXDS0c3d0LS4H6ORrUqf6brdUsMxn6kz8UtzmC5cB4lZ5ZZPoaI4ooosBupQpkEMBI4kzPkr5gAsOChV9rYdvtVW+v6KLV3kwwHdqtHr+iXUmXuKLhybvOo9FmBt+g+S6vYcAD8+gVPtzeJsRTqQ3oHBx8yYVljYHNG9qYpjPac0HlN0qk5pEwuU0t6hTH8Om3N957i53loB6KNW3xxJ+3HkFbwmV8VHYe06hBca/xdif+p8EFPCZPFRJy9EmAidUQa5bjkCw0JQaCm5QYb6qBA4IAJyOqTUeALlQIhzJSH0kRxTQnmPDvBSwkZzGi5NlRPa7EPho7gNuvUp3aeL7ap2VM2Buea2O6+wNLW4/ouPrdVveyHQ7/s/RrHHxMnX6f5FbA3YGUF3Lh8OilHZZyFw5+zxjrda2jRA7oFkNpQ1hsJKxeHxZt8d7qMfgnilUzC0xP5/PVXu1awqU7wbLPbUAGWDeZP6JzajXvyU2XcWSY4yTb/xKWmNlBNph0GAMzCzB8ylNa1w5p4YKrTw01S0DhxJOt5AiLc1TbObUJJboNRwQoupJ8pmt3XwxY/8AC4RPXWFE3nw+HZX7StmdIBDW26XPkrndqnIL5tpCrPpDwgLGPgcWn4j810NGluRyNdK7K6tv9lGWlSa0DTiqavvpiT/zCJ5KmdR8CmnYfxXWWKK7HK8aT7knE7brvMmo4+ZUaptCqdXE+KLsuhTZo3VtqJuYPrDzqURrH5KSWFM1GT0QCKrYiPFRn1ybIzhxzTecDRVLINlN2qkB4Gqi1cUfBRe06oWGi07QIKv7ZBSyUXJxDp1T31txUmvs69ijp4YDUJpjtERtc8bpf1xynVKQI0CaZgRxKhLQ3Qlx1KnDDg6yjo0g3TVPlQljXZjRoCrNtYp0dlTu42McJ0CsqoIBI4A/BUmyMG57m1z3gKku8IcJPnCw67M4R2rudP2Zp1lm5y7fUuNhbF7PJ3Zzau4n9Aug4AZRACrNnUQb/JVxg8U11O8SCQfEEj3xK40OXZ288uyRJFYBVmNxQqHK2/VQTiS57wXhrALkqRRx9Joy0+8egMfv4BWvcUWPbyQ6my8zrmw9ZUmjsqoMXRqMs0Mh99QMwAjzB6QVYUMNlGapbjHLq7r0VrRqNDTUNmxbw4fPVXhAplzPojM744gkikPZAv4rPYbFloLG6EXPn/dW29VYak3P9/d+SqdnUs0ADqfVKm/eNOGNYzZbou/hx8/Oif3oo58M8coI8j+hKRuuB2WYaOv6qftKlmpPHNp+C0YpOLj6nN1CtyOQVaMG3wRt8Y+fBS8ZQdmNlAqOA4rv2cQeIEXPuTDwTqo9XEHkfNRjiXnQkIWWSJbmBQ8TX4NTbi480kYclCyyVEarVcbSmIhWP1FxHJE7BxwJQotuRABRgTwUsYMcbJDsNyQoO5DOREnezdyQUJZq6j0TUgpykmmEOEbHI3Jym3Pb7XDr+6gQgnqT5IDjA58kwQRqgVAhbc7lF54RAPj1U3dKhlo3+0L/AKeiz22axcW0WzEh744AGAT7/RdB2HhmOotaIgCZHGdPd8FxPaEt2Tb5HofZ0dmDc+7Mhs3eE0az8PUcO6TlJ5cL8+ClOxzWunMYqHgYE8lkt5dmPfj8rZAc4S4cNMxHUKJSdVbUex81GscRIAzCOMDXRZPC93cjprLFy29zqOHothrbE83aDxVthatGj9ppfz1PgAFiti7VPdApucCO6Wss7zmCtHitoYp1MBjBRaB3i4gv6xwaOuvgqx4KZE3wRds7bqPqMpN0c64ymYHtXnwAtq7oVM21tkNY0Ek5TMWkxwgWaOp9CqHD4pjHh7iLiGAmCZMlxIvBJJvc9VX7axRIyDibQAB6a+Z9EdzIsSsbq7VfXcXOEDRoE89b8bLR4Qdjhn1PtBpPmBPvKzWDYzutDhOpMTPINH3epgdVe7bp1fq4pMgNqOawACXSXAjMdBcTAHDVBcsZJ8Ujdbr4csw9Np1DGj0AVliHd138p+Cg4TAMDQ3O5xAE98mPensVRim+PuO8dFqj1SOVOm2zl+1cY3Obz4QqivLjIlWuJpAOJgSmsoPRdxLg4rqyrOEc60INwDgbqxAd6IzVjmpQLI//AA/mZ+fBJdQINrKV2swLnzR5JMHXrwUoNkN1I85STTKmvFrBBwGWBqiyIrnU+gQY3kpTxaITfZ2lANoayhGnMiNEloFKpfxUhj0htGOHBGWqxlHihRrFrgeSaaChClEssatam9xObLN7iwPETySalIATNuaiNcOInwsU1jakUixpMvIaAeuseUpeSShFyfYdii8s1Bd2WO5Gxm4g1K1VvtOMTwbADR0st/8A8PNOkezaJiwFjpa/E+Krdh4bsadJnEwT+i01SoGMLjwElcCK3tt9T0eWW2ox6L+xyephSKxe8EPBMjkTa/l8QqYYttDHVM7CadVrT3RJBuJjiCeX5rT7TrF9RzuJMrKbzSytRqRYhzD6tI+eq35sChpq+8xabVPJq781SLCrXeXh+HOQD2i7utInQjT1upOMfiarcrsRmabkUxlaOhee87wRYOiyqzK4fuoj9mVKNQAEODoIBsPA+nwXJR3ZJXyDA7MDZeZiTc3c7qDwb1S3bLqVGVKxENaDkaftRPu+KsMXQIDXVGuGblcE8BbS3O6f2xtkCi1lMBwAg6QT4C8eSKBJvsZHAY0NEkgHiTeL/FbXYe23PYS3KG/9Q2A8AdSsFs3ZoqPJfpm00HoFebbxhAYzIGxMRq7hoi+vAWrXJ0vYuIaGNl/UCbu/EVa4vEA0nxrEeqx+5+zcoDqp7xGgJgdOq12LoNDQfnmm4btUc7UxSbOeY6hDjIULIr3apBfHBV1UN4Nuu/F8HAkuSER1TT2BPOTbmGVcoNilyTwoSiAgpYdyt5oBsIU4GqJzPIJT2hEAVCDb6fKE1VokDjBUx1I689dYSKrDGtuigaInZ9B6olK7PqPeiUJQltUc9ff0S3smcun5Jl2HP7p+CbxB49eqNiFyNgpQpyCeSfw+FJKmMwTxoCT4T7kNxbaypmOCVshofi2B3stJjxgGVcUdmQCagItaNfBOUdkX7QNjx48NFl1kZZIbYm3QTjiybp+XHyNphWAntDZoFpVdtfarXyweyPeVWhtRwgudHIiycoYW8OE+4pOHAocy6js+oc3UehUikS6QAPKVU724UOpthoEPGnz0WzqYdgFnEeSpdt0T2TpGl/Qgp+V7oNCdOtmWL+ZTbJolhBeAQOhJHpCd29i8O1uaQHEWe12Zs/jae83xv4q12MA7xIlZ/ezZwYXO4ET5rhLqeoaUnQnY28td7sphwpGBN/a5u4m8A6wVfYl1Etl9PK43No98cViPoyotfWLXCYebHTUH0XQt/dh0zhszGhjgY7vd4dPBWlHmhKmrXzMhhcWx+KLMOO0MD2e80fCfIqt3w+sDE031QG5zAAblDQOAF7+JJQ+ix/Z4io3Ui0nXUFa76YhNCi/kRf8AqA/+xRUUpUGU26/fQ0Wxq7BTYS5swLTf9ldbbxjW0gbGTb0Kw+7dcmnSg/d+Ila/eDDTSZlF5/Iq+l5kl80Zdctqb9TJYimSZjXrKQ/CERMweOUqe7DOoDPVe0NOgEk+Sh1cYXkdnmLTpLrei7qfkeea8yPiMO1v2wf6XD4hR+zU5tCq85S3TxgK0Zg4aWPOUdRInlMAhHdRFGygbSSX0oVy7ZoGvqP0MfFV76aKaZKaITmJ1hbF5lKfSSBTRIE+raE12piE4aZSez5qEG855lBPZOvvQRJZoMNsojUAiIg8lLGwxALR4haNuGCcbRCxPIzTHAkjN0tlRwTh2ceS0TaQSHNA1EoeIy/hIp6ez5i/qpX1Icb/ABU2nBMA36pdV7Wi9yg5MsoIKnhyGwIaPVMvwTiDGo96fzNN5PgSR5InVgDyPmhbLNIoMUxwcQWkxqOijvFKpTeySZaYB1Bi39K05yu1s4aEGCOqzm2cLeYl2ggZc1uI0niCLHLCZFp8MRKLjyjJbrY4y2GkxLSJA08VO3xw1QszGmQ3iZBB5RA1Wc3frdlVew8HT5Hj6hdG2zQD8K4gyIzDwkGR5SuLKLTa8j0Sn8Ml3OQfRtixTxj2uMSbSuub3Yxn1M95pJIMAgnjK4pgaIG1C2B3j6dV2La+yWnC92ZaJFzEfMq83z6orStX2bOYfR9WnG1XRPe0Hh+y2f0rtc7BNcGgNZH2gTcgz7uqwmwT2ePqtff2Tfldb3fjZjX4LtGgDuEECwm5DoFuHwQbqf4FpK0vv/uF9H1GabJnnZpPDQkaLa7WcXAAggC/zIVDuJUAw1Pq3gtTjnDKJE8LQeGt0zT/ABL1Mmsbd+hl62zRWfmdmPDM6wHgBqfCynNw9Gk4DL2jhq58uPlJUUU2veR2jyJ7zoEDjAv+ykUX0e7leTOgMSSNY4z0XWlLs2caMW+UhytiQ5hPfpH+UEH4EKExhb7VQ8zLHEEHxkK4qUmOaTLg48XCR6aKHTzt4B0chNuNwomGS5CbkcMrQ0X0zEH0CbxQcGw0NaIgicxPW5kKJWxL5Mt7o+yQCB5EJ9uMa9s5RLdQeXgrUytoZZAbBYH9coEdJF/coFd9M6NLT4yPhKlh7XG7B5EhFiMGx0ZT46+6VZcdSj56Fd3UoUpGoU52xXRIcD6j4pFTZFZgzRY8QZVty8wbX5ELsPmyCk/Uan3fgjUsFG/lEXprMiKxUb9wfaInulJc2UjMBrbkiC2L7C+nl+ieq0hAgEoxTzXlOghrSXEQBJJ0AGpPRBsukQTUsDHjI04XSGuHGY4HVRqe0aVWXNZmEwCHEF3Uj4KdhAx0gaxYO9oeJ4+IQU0wODGK9N5jKQb69FS71Y7shSbGZzYfGp1nTh3sok/ehazDsDQslt3C1ariWjMHOGXSAAAR6zM8bckyDtisqqPBz/FUxTrUnzJe2HDqToOcGFtcI6p2L2inILCDclwBB4SDPkqjefY7mYdlTKczXzPiY8hIb6p7YO1Tnbm+ei5urSjlfzOxom56dLyOaVyae0WVDofhK7fhcYyphSZmaZ9YsPFcm35wWXFWsBUHo4g/otTgezp0yXuacrQXS1pcGkgEgES6J0CTKSpGjYpPb3b4MZUbO1SG/ab8CPzXXtoYZ9XBOpdm4HJa7ToPFc+q7PpU9pUK9GpTcKgqAhgs0gtjyMyuq7NdbyRUk2q8iuZSj1XcwO4G2GCjTpOIDqRuCYJvJ14hafE4/wCsudlDuzacoyiS50STZU+0dzqNSrWflcMpkhn2iQXRHPS/VXW7lKmM7GCA1rS0TNskgSPa72Y+QWrTY3u39jDrMsHHYur/ANiNp7BrGhFAtY90WeeH2pMamBaIF0e7G7LqJ7SrVa+pECGw1pOp17xi3DUq3pYvOTrA4JTpa7jfQT8+9bJRt2zDGSSpdCWHPkWa68GJFufFNvZYlhB5xf3XTb67WsealQ5QJN7gC50uq3Z22qBrmkwubwBdETEkRNrKrkl1LqLfQtaFTMO+0B0xoo2M2U0j+HlY4mS6TPly10Vhisw0AM9NPmFHq4cubd0c5srJlZR4ohYvY4PPNA73B1tSOBVc/DZTBaBHGTPOZkhaVlA5AC6SL3n9lHxVLMHiZNiBOnOP0VlNlJY11KqiS2AKv9JGb36KyNR9gAI1cRceX6BVZoEAW06fmnKYLeBAcPL14KzRVOiZ9dZ+L/SUFF+rD8PqP0QQpBtl46EhvKVEr4qFDdjCfZvGo+fJUUWF5EmWdaY1EqPh6bng30PHQo8PVp5DUqPDQ27iSLdDZR9n7zUK1RzKbTA+3pJkcFVyUeBkY7uS8Aht7LmO+u+ZfnoUrUwe84au5Dw4rou0qv8AAqEXhh010uvPmOqFlV+b7TiR+UJORuuB0FyanYm3nS1rJOlg206Rb5ut9sHaec6weHPrZck2HiWgFrnhpiRI6i087Lc7FxrKDe2xDuypH2Zs6odcrGjvO8dEqLdjZLg6NILSTZpBm/Diqijtam6q+jQBfUYBmMd0aASbCeMfhK5bvFvjUxboaX0qbYDKbTqdczjz9enNW24m1mYUkZ8+eM4GrnXuJuQ33ym+Irop4dqze4hn1k18O4d0Ny54Grp0vqIHospsDZQ7R1KsIfScQ6OI+y4dCLhbbBDK6pUeBTa7LYkep63A8lR73fVw4VatVwLW91rLPcJ+8CDlk8bBUzYt6TXVF8OXw7XmY/6SNkGpWZ2AzlzRIGoyS4mNYy/7eqibQ2c2rh2Fvec/KZNS4aYGUCDYyBbmtLu/vhs2kZeTSqEkB1Q53EWGrZgSInobqrr7wbPpVXdme2oum3ZP/h5jLmAlo7s6RposubDJRT+ht0+qUZehltkYfEYOpL2B4bmEPALRLspcDqAC4HN+ITqus7ExHcDngNMXAdIHmsFtne/DVafZsJpAXDnUnOkwGwZlwBAgkgysthd4HU3Q1/aiBYZo14B0X4KsMM73A1Op8WTb+Vfvv6nc9n4XtKby8FoquJ1IMCGtPMezPmk7J2Ayg/M1x0gghsHWDYaiSJ48VyXDfSDimN7lQ2Oju8I5Oa64udWkaDVXOA+laoINWkDa5AFz4g2Hl5rowltjtObOO6W6jqlSiBprwVDt3aLKDJBDqh+zN78T0WG2v9K2djm06Lmk/azCY/JYrE7yF57xe3wAdfqZBR3+QNppttbaxFQPa1weCIc1rhbvAyW/a0iNbqt2Rj69OsHR3mmTm0IkyYdzN+ZlZ7AY1zTmab8R70oYwuqOc4noOiTJtsdFJI7Vupt51RozOaGttdwk2scpggLVUMY1xgEHlB1/dcO2XjbjLPlxWn2bj6lN4dIEeYg8xy6dFI5ezJLH3OnvpAqDiaApiRmg8RwulYHabHBoLgC6Q0TckWIHP+yi7w7cGGDYZnLjESLWkTykAx4J6lQhwsYxFPV8yTzN/eOim0GksDjFvM9AkGoyoO6RMEgx15G/u4oy97RGQEnUi0pm7cuBFbXyN/XB+D/R+6CLO7/oH/UgrUiu5/tMqziiQ6IMajpNinMIxxOUi8jxjkfgjwuDDGFxDi2bPFrHoYsm/rJaDlY+Ytx9IumN+RnUWmnIrN5NlYjFMApGGn7MxBEyHN4HxCrtgboYxrxmNNgH2pMjSe7ofX0WuwNZxylrXGXRJHsNtmmePj/aXtnbmHwzS6tUAPIXceQA1WacFfJvxzdcEttOnTpmm59iIJc4SZtP9lyzejY2Fae9WkDXLfiYvoLQq3e/fd2Ie76uC1sATqbaeCzmzse8u/jDMzi4tEjqOfgkymh0Y2TsNtJlN3/o8PLh/wA2pmfHVrSYHioW069eo/tari9/MzbwHALSYXsz7NVr2jSI/wBqq9sUWgnLI9DfiJsIvayT4luh7hSsr8DJu4nNJgCPXRbP6PcEauLZlbaicz3uAmIhrQRI1vHQ8lkcO5kjNfhbX4qz2dtCpQqHsJc58g0gZcdAIDZgxz56qJpStgd7eDo+/G9FGlSfTltSZaQSPaGunERrwhcP2vtJ1eqX1HF06TJsLARyAsAugDcY1m58Q99N77inTIJaLWLiCM2swIurbB7oYWi2G0mA/ff33ze8u/KFjy+1sCdRd+n7+gYaeTXJzbC7ExNUh1OmabCNXHLPWNVb091Kh/zK9uIaD8SVsxs+oXZR62jxSNsYR1Nmdg7SAS4AtEWF7tJjU+iS9c5SSTXIVibMi/dCiD/m1D4hpTFbc14M06jSODSIJ8wYV3sSo19OHVXueJkltiS6QAZnTpztotZgtkS1pkgxcH9EM+slg+JkWKzmH/AazSO1puyHVzSHAeMWb5woBwpZxz97SIkTqHAkBdwwuzwwkgkn093NQdrbu0a477crvvs7rvXiPFZoe3YOVSXHmv0GLT8HGHFo493hoSOnglOozeIHHlHA+q0u2NxK1HM9uWrTAJi+ePADXwWd7UNENMtGk6jx/X3Ls4c+PMt2N2jO4tdRh2FAdDSfJLdhHkyD8+iPDHUj0CmsqHiJ6BPsqDD0Hge0J81f7FdWa4PIa4cGOJBde1oI+dFG2Vj20z3me1bNxHxkK9qBoAMgzrxBBGotpeOYKRKdPoNirXUpK+2qwqNcS7tKbiWiwyxHkfZ9R4pram1zXe6o6o5tSxIPslwFjFj+ngnMYO8ZEiR4xqDPPiq9tAF+Vzr8OHhB8I5Jl8Fa5L7djeB9M1GudUzVGBgygNgmzR3tINp5SV0vdfFF7cjqvaPaJBOpZbjAmJF4HBcSFIsdbUHR2rddLwRddO+iwEUX1alQOyty5L52AXObyFuabjl2F5Im68j6IJH/ABWl973FBNsVtHqkEQRIWe2lWoMJNSqI0Abr6AXPXRYzaG8tasMpd3eQsFT4rG5buAAAnkB1JP5oqTRVpSNJtvfduHoO7IFrRppncT7m9Tc3XLsRtJ9ZxqVXEzwHvAnTx1UPa21DiH932Gmw+8efh/c9HGi3hcylzbYyKocdUJ0GUckvtJ10Hv6eCLZ+FqVnhlNpc48Bw8TwHMldH3Y3KZRIqViHvjT7Df1PVYNTq8eBXJ8+Xc0QhKXQyOyt2sTXLXMZkB+07utjw1PktFi9y8Q9pipTJHDvAH1FlvmegQBvouDP2vmlL3KRqWFJcnMdn7i4t74qZKbRxnN4gAfst5sDd6lhGQwFzz7TyBmPQch0VkSeCVUe6LR6rLqNZqdR7sqUfJfuwxxxj0CY3iQg+kDq0FZnH1Kmd/8A68su6GCiHZJEASDfKf3UY1an/uD/APsD7uXied/ctWP2LOSUlLrz8OT/AMCZayKdP6x/U1fYt5BZffLY2JxGWjSewMeZeILYaPvOk5gSfZgTHirHZ21GUqP8Ssarm6vyFpM3AjQeqgYbabKji41HME6NDp9Y0TMGm1GPI9kW9v8A1f0av5hlmg4q2ufmhnYm7DsHiWCm/tKVRsVM0ZmuAJDo+6dByJ4ytjlEQTfgqqjtig0QCepyuk+JhGdsUCLu/wDF36IZcGsyPdLHJvz2vkEc2JfaX4os2tgQHIUWHSQVm8fig54dRxZpNDYydjmBdLu9NjxFvwhR2Yh4scc8iRpRgxLZB5yGkTaC8nkBVex8svekvu2zv8o1+ZHq4dE/zj+pqagAN3X8VUbU3awle9Sk0niR3XeoVmIsSJSgAeULm+I8buDcfQ00muTne0fo6cwl+FqZh9x9nf0uGvmqDtiwmnUBbUBuHCCP18V2AsIOuuih7R2Rh65Bq02ue3R0d7wnl0XV03tia4yq18uomenX2TlFatBF7/OikYTFlvd1by5eC1m2dxKdQjsqvZjiC3NPhcFZXaeyK2EP8UAt+xUFw7oeIPQ+9djDq8Ode6+fJ8P9+glwlF8kzEQRIItoeYUStTBMSAY8j+/hzTNLEMcIEAn3/uhiA0Ngm/A8vNaFwUl5kDF1HuObi20TwHxWn3G3pFGrLjGYACZN72PG/NZGq+8G3Ij4eBTNAlvjw8kxIq3Z3z/G9P8A+P8A7h//ADRriP17r8+qCO6YNsRGJ3vIEUqQH4nmT/pbHxVPjdr1sQQHuGX7rRlaTzjifElQxBJnTkl0dcxHgm2LoscNQgTYfkrPYW79bGVctK1Nv+ZUPsjpHF3T1hW26e59fFRUqDs6Mi0HM4anLyHCV1bBbOpYemGUmBjRwGknU9T1XI1vtFY7hj5l+SNOLDfMiJsjYVLDsAY0CBc8XHmTxU0MMyIjqjdVm3NABeayZG3cuWbUqQp7S7jHkmW0DOqfbUGmiTUBCz3LoiyFtbASXMk9ErOY096TQeZuLJsYzrkFmQx+EcKj5LLvcfbbMFxItNk1i2gZBLTDBMEETmcYkcYITeKBzvnXM74lSTimANDaVMkN7xc0yT6r3+PeoYq96l24+y/U89Kt0r4/2N08nYvEjMXNgTeLzCPZDR2rBwnj4FSK+IFSgZpsa5rmgFrYsZke5Vt4Mcv7+6VbEt+PMmqbbT5v7K/sCfuyg1z/ALZM2yW9s/LEW009kSna7m/VWAEZu1uLTGV2vFVmccx6qxr4ZowzH5Yc6oRPNuV0eUhDJDHix4cd3UopEjKU5TlXVMgfPvUjZ4/is/mHxUc6fPNPYIxUYR94fFbM/wDTn6P6MTj+KPqbVlEEGTHikgNao7KxcnZA1hfNqpVR6hpj7nTYFI7GNUhjyZjTonC4xJuEtzcVQKCLG6lQ8dTp1WGm9oc13Aj3g6gjmpQCOJ4ghWjl28oNHIt6NhOwj7S6i6S18eyeRPMe9VDcUS29+pXbcXhWPYabwHMIgtJ1XJ98NzamFmrRDn0OIJzOpjrzb14cV6PQe0Y5koZOJdvn/kx5cTjyuhRuqWg6fOiazcJkcNUwx4IQY9dhKjMS/X1QTXafiHvQUsh0DdncXDsbnrfxXm1/YHAgDj4n3K22XuRgmVM/Zl0aNe4uA63181c0cKGt7oIvob68baqSX84+C8pl1eacnU3ydOOKKXQliodAkOd1TNOrmBjnz+KJhnX3rHKO3qWXI+1zT4oNkcE0QZ7rQfNO03O4hVcV2CIe8G2hCdpOgRKZIEzAPVAO6Ku4lDlS/NMd7Qzl9Upz442Sm4i8QVeMmShbWcIUTE7GpvdmdMxFipglJe4xz8EzFlyQe6Dp+aFzhGSqSshHZlFrC0h2UkE3vI0Q2dsyiDnYZgmJdxDS4iP5Ql0CypoT4EQrJ9amGta2mGgA5jzJYWT11W7FqJvcsuSSvqrfPb6fkLlhgqqK/DoSGYZxY1wAhxEc76Kux+CZWblcSIMyDfQj81JwlfIALkAtMTpBJMDrKiUqEnNJB5SssnCG2eJtP80y6jdqXQgP2DTbpnd4n32CZo7KaHzoBpe8q1rMPO3hoo5jSfNO/mGof23z82COlxf8V+AQa1mr4HzonS0ObqfGFAbRbnh0k+o1VhTaOGgWPK1F3Y9dCPSc5hI1HT4qczFTwMcbJLjbSUjtDyhVtS5aBVi3sPlyROqQPyCMVyTlsDqgQAQFPUlApNaRPFN1aZItFuHPmE++o3gAE2SClSk0FIxe3fo/ZiC6pTii8mYHsExxHC/ELnmL3axVKqaT6bpHFoLm6ayBou5U3Q7vE+R/JJxmANcFroA5g/kuhpvbGbC9uTmP0/UTk08Jcrg4B9Xqfdd6ILtv+C8Pyd7v0QXT/n2n+f4Gf+GfmXGF1Hgiraj54oILho3v4hFHQ+KdpeygghP4iq+EdocUo6/PIoILO/6oBlqVwQQRXQsyNW4fPNTKWiJBNn0RAqf5JB4+P5IIJmMqxrCcPP4lLq/kggpP4iDfA+CJ/tN8kaCgUPVOKilBBUgXiNP4+P5BPt4+CCCvmD2J/DyUGtqEaCXEXEZqf5zf5SpQ0QQTZ9vQIQ1T7dCggk5+3oAj4zVvmq8/Z/nP+1BBKwfCv35hfQSgggthD//Z", artist: "Seedhe Maut", title: "Red" },
  { id: "DHH_2", src: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/b8/41/71/b84171ff-de77-3505-af3d-41a5b8d37fc4/199066166178.jpg/600x600bb.jpg", artist: "Seedhe Maut", title: "Nayaab" },
  { id: "DHH_3", src: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/60/51/e8/6051e86e-9c3e-3187-e629-546ced4cfab7/cover.jpg/600x600bb.jpg", artist: "Seedhe Maut", title: "Lunch Break" },
  { id: "DHH_4", src: "https://images.genius.com/4a7d3581d619dbf15cf94b1a7e91dd29.720x720x1.jpg", artist: "Seedhe Maut", title: "Shutdown" },
  { id: "DHH_5", src: "https://i.scdn.co/image/ab67616d0000b273a9e75a1283dfda275de82714", artist: "Seedhe Maut", title: "DL91 FM" },
  { id: "DHH_6", src: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/41/10/fd/4110fd27-8e5b-b303-2d89-c060459208b7/859705595898_cover.jpg/600x600bb.jpg", artist: "Rawal", title: "Sherdil" },
  { id: "DHH_7", src: "https://i.ytimg.com/vi/MBN-7hFFEi4/maxresdefault.jpg", artist: "Karma", title: "WDTBU" },
  { id: "DHH_8", src: "https://c.saavncdn.com/526/Narmahat-Freestyle-Hindi-2022-20221031125134-500x500.jpg", artist: "Karma", title: "Narmahat" },
  { id: "DHH_9", src: "https://c.saavncdn.com/157/Airplane-Mode-Hindi-2023-20230403025856-500x500.jpg", artist: "Karma", title: "Airplane Mode" },
  { id: "DHH_10", src: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/e2/df/65/e2df6505-1b9b-917f-bebd-d4508645e756/cover.jpg/600x600bb.jpg", artist: "KR$NA", title: "Still Here" },
  { id: "DHH_11", src: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/6a/94/d6/6a94d69e-3ba6-af74-fc2e-769a6b80b061/198846875156.jpg/600x600bb.jpg", artist: "Talha Anjum", title: "Two Tone" },
  { id: "DHH_12", src: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/38/34/f2/3834f227-937e-1f2b-d587-3c79d0192011/198391960598.jpg/600x600bb.jpg", artist: "Nanku", title: "Gulabo" },
  { id: "DHH_13", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKrgNITY48BavOG1mJnVOIjYyeRrpePlFjFg&s", artist: "Seedhe Maut", title: "न" },
  { id: "DHH_14", src: "https://i.scdn.co/image/ab67616d0000b273a4d7912cb5b156a22a7b5d8f", artist: "Azooz", title: "Noah" }
];

// Punjabi Row
const PUNJABI_ROW = [
  { id: "PUNJABI_1", src: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/5c/9b/34/5c9b3408-8aca-5e2d-17a9-354d80d4eda0/cover.jpg/600x600bb.jpg", artist: "Arjan Dhillon", title: "Patandar" },
  { id: "PUNJABI_2", src: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/04/4a/9c/044a9cd6-6d74-2c81-2ad7-7feabbc229ee/cover.jpg/600x600bb.jpg", artist: "Arjan Dhillon", title: "Tutor" },
  { id: "PUNJABI_3", src: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/d2/89/ac/d289ac98-749e-3822-6b6e-b06aa4815715/859740651597_cover.jpg/600x600bb.jpg", artist: "Diljit Dosanjh", title: "Pop Culture" },
  { id: "PUNJABI_4", src: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/ec/9a/1f/ec9a1fb9-dc98-cd4f-d4c9-01eed5e67b19/859778016276_cover.jpg/600x600bb.jpg", artist: "Diljit Dosanjh", title: "Ghost" },
  { id: "PUNJABI_5", src: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/d2/89/ac/d289ac98-749e-3822-6b6e-b06aa4815715/859740651597_cover.jpg/600x600bb.jpg", artist: "Diljit Dosanjh", title: "G.O.A.T." },
  { id: "PUNJABI_6", src: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/d3/08/bc/d308bc6a-20e1-6532-d933-35d1b429210e/5054197755538.jpg/600x600bb.jpg", artist: "Karan Aujla", title: "Making Memories" },
  { id: "PUNJABI_7", src: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/97/69/58/976958ae-725e-bd41-6755-f0921c697840/810063889609_cover.jpg/600x600bb.jpg", artist: "Sidhu Moose Wala", title: "Moosetape" },
  { id: "PUNJABI_8", src: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/dc/46/a9/dc46a9c9-794e-2d7a-1afb-97eb4ae0fff6/197188915704.jpg/600x600bb.jpg", artist: "Shubh", title: "Still Rollin" },
  { id: "PUNJABI_9", src: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/c3/8c/79/c38c794e-bc01-431d-90ba-022cc130a3c6/859761929279_cover.jpg/600x600bb.jpg", artist: "Karan Aujla", title: "Way Ahead" },
  { id: "PUNJABI_10", src: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/0a/3e/3d/0a3e3de6-e691-3636-7545-fd373f705345/810059349650_cover.jpg/600x600bb.jpg", artist: "Amrit Maan & Sidhu Moose Wala", title: "Bambiha Bole" },
];

export default function FloatingMusic() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const renderMarqueeRow = (items: typeof WESTERN_ROW, direction: "left" | "right", speed: number, rowIndex: number) => {
    // Duplicate items to create infinite scroll effect
    const marqueeItems = [...items, ...items, ...items];
    const isRowHovered = hoveredId?.startsWith(`${rowIndex}-`);

    return (
      <div className={`relative flex w-full overflow-visible py-4 -my-2 transition-all duration-300 ${isRowHovered ? 'z-[100]' : 'z-10'}`} style={{ perspective: "1000px" }}>
        <motion.div
          className="flex gap-8 px-4"
          animate={{
            x: direction === "left" ? ["0%", "-33.33%"] : ["-33.33%", "0%"],
          }}
          transition={{
            ease: "linear",
            duration: speed,
            repeat: Infinity,
          }}
        >
          {marqueeItems.map((album, idx) => {
            const uniqueKey = `${rowIndex}-${album.id}-${idx}`;
            const isHovered = hoveredId === uniqueKey;
            const isAnotherHovered = hoveredId !== null && hoveredId !== uniqueKey;

            return (
              <div
                key={uniqueKey}
                onMouseEnter={() => setHoveredId(uniqueKey)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative group shrink-0"
              >
                <motion.div
                  animate={{
                    scale: isHovered ? 1.15 : 1,
                    filter: isHovered 
                      ? "grayscale(0%) blur(0px) brightness(1.1)" 
                      : isAnotherHovered 
                        ? "grayscale(100%) blur(4px) brightness(0.5)" 
                        : "grayscale(100%) blur(0px) brightness(0.8)",
                    boxShadow: isHovered ? "0 20px 40px rgba(255,255,255,0.2)" : "0 10px 20px rgba(0,0,0,0.5)",
                    rotateY: isHovered ? 0 : (direction === "left" ? 5 : -5), // subtle 3D tilt
                    rotateZ: isHovered ? 0 : (rowIndex === 1 ? -2 : 2)
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className={`w-20 h-20 md:w-28 md:h-28 lg:w-40 lg:h-40 shadow-2xl border-2 border-transparent transition-colors duration-300 ${isHovered ? 'border-white/20 z-50' : 'z-10'}`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={album.src} 
                    alt={album.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  
                  {/* Glassmorphic Details Tooltip on hover */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute -bottom-16 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-xl shadow-xl pointer-events-none z-[60] flex flex-col items-center"
                  >
                    <span className="font-black text-xs md:text-sm uppercase leading-tight">{album.title}</span>
                    <span className="text-white/80 text-[10px] md:text-xs uppercase mt-0.5 font-bold">{album.artist}</span>
                  </motion.div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>
    );
  };

  return (
    <section className="w-full bg-[#0a0a0a] border-b-4 border-black relative overflow-hidden py-20 min-h-screen flex flex-col justify-center items-center">
      {/* Title */}
      <div className="absolute top-12 left-6 md:left-12 z-20 pointer-events-none mix-blend-difference">
        <h2 className="text-4xl md:text-6xl font-black uppercase text-white opacity-80">Music I Loop</h2>
      </div>

      {/* Marquee Layers Container */}
      <div className="w-full flex flex-col gap-4 md:gap-8 mt-16 md:mt-24 rotate-[-2deg] scale-105">
        {/* Layer 1: Western - Moves Left to Right */}
        {renderMarqueeRow(WESTERN_ROW, "right", 45, 1)}
        
        {/* Layer 2: DHH - Moves Right to Left */}
        {renderMarqueeRow(DHH_ROW, "left", 50, 2)}
        
        {/* Layer 3: Punjabi - Moves Left to Right */}
        {renderMarqueeRow(PUNJABI_ROW, "right", 40, 3)}
      </div>
      
    </section>
  );
}
