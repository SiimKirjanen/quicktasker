import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { WPQTPageHeader } from "../../components/common/Header/Header";
import { AppContext } from "../../providers/AppContextProvider";
import { Page } from "../Page/Page";

const GuidePage = () => {
  const {
    state: { pluginURL },
  } = useContext(AppContext);

  return (
    <Page>
      <WPQTPageHeader description={__("Info about the plugin.", "quicktasker")}>
        {__("About", "quicktasker")}
      </WPQTPageHeader>
      <div>
        <p>
          Thank you for your interest in the QuickTasker project. For any
          suggestions or concerns, please write to{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://wordpress.org/support/plugin/quicktasker/"
          >
            support forum.
          </a>
        </p>
        <p>
          For some reading material about the plugin, you can check out the{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href={pluginURL + "help/index.html"}
          >
            plugin guide.
          </a>
        </p>
        <p>
          Source code is available on{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/SiimKirjanen/quicktasker"
          >
            GitHub
          </a>
        </p>
        <form
          action="https://www.paypal.com/donate"
          method="post"
          target="_blank"
        >
          <input type="hidden" name="hosted_button_id" value="QEU9KGTX4NZHN" />
          <input
            type="image"
            src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif"
            name="submit"
            title="PayPal - The safer, easier way to pay online!"
            alt="Donate with PayPal button"
          />
        </form>
        <p>
          Bitcoin address:{" "}
          <code>bc1q2vam0ree3zw4j3f92vkfjd9vvxlwpxxsrpmkhu</code>
        </p>
        <div>
          <img
            src={pluginURL + "img/old-banner-icon.jpg"}
            alt="QuickTasker"
            className="wpqt-max-w-[600px] wpqt-w-full"
          />
        </div>
      </div>
    </Page>
  );
};

export { GuidePage };
