import VerticalInverter from "./VerticalInverter";
/**
SettingsMenuContent.tsx 
@Author: Luke Johnson
component for the menu settings, includes vertical inverter component.
 */
export default function SettingsMenuContent() {

	return (
            <div className="menu-content">

                <div className="menu-div-column">
                    <div>
		    	<VerticalInverter />
                    </div>
                </div>
	    </div>
	)
}
