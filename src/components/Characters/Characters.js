import { getDataApi } from "../../utils/getDataApi";
import { IMG_STANDARD_XLARGE } from "../../constans/api";
import { ROOT_MODAL } from "../../constans/root";

import classes from "./Characters.css";

class Characters {
  renderContent(data) {
    let htmlContent = ``;

    data.forEach(({ name, thumbnail: { path, extension } }) => {
      const imgSrc = path + "/" + IMG_STANDARD_XLARGE + "." + extension;

      console.log(imgSrc);

      htmlContent += `
         <li class="${classes.characters__item}">
            <img class="img-cover ${classes.characters__img}" src="${imgSrc}">
            <span class="${classes.characters__name}">${name}</span>
         </li>
      `;
    });

    const htmlWrapper = `
    <div class="modal ${classes.wrapper}">
      <ul class="${classes.characters__container}">${htmlContent}</ul>

      <button class="btn ${classes.characters__close}" onclick="modal.innerHTML=''">&times</button>
    </div>  
    `;

    ROOT_MODAL.innerHTML = htmlWrapper;
  }

  renderNotification() {
    let notificationHTML = `
      <div class="notification ${classes.wrapper}">
         <div class="${classes.notification__content}">
            <h3 class="${classes.notification__title}">Контента нету</h3>
            <button class="btn ${classes.notification__close}" onclick="modal.innerHTML=''">&times</button>
         </div>
      </div>   
     `;

    ROOT_MODAL.innerHTML = notificationHTML;
  }

  async render(uri) {
    const data = await getDataApi.getData(uri);

    data.length ? this.renderContent(data) : this.renderNotification();
  }
}

export default new Characters();
