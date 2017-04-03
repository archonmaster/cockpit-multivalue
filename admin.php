<?php
// register content fields
$app->on("cockpit.content.fields.sources", function() {

    echo $this->assets([
        'multivalue:assets/field.multivalue.js',
    ], $this['cockpit/version']);

});

$app->on("cockpit.content.fields.settings", function() {
  $app = cockpit();
  
  // Max width
  $label = $app("i18n")->get("Options");
  $placeholder = $app("i18n")->get("Separate different options by comma");
echo <<<EOD
<div class="uk-form-row" data-ng-if="field.type=='multivalue'">
	<label class="uk-form-label">{$label}</label>
    <div class="uk-form-controls">
    	<input class="uk-form-blank" type="text" data-ng-model="field.options" ng-list placeholder="{$label}..." title="{$placeholder}" data-uk-tooltip>
    </div>
</div>
EOD;
});
?>