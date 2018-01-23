
// import css for block editor view
import css from  './style.css';


import classnames from 'classnames';

const { __ } = wp.i18n;
const { registerBlockType, Editable } = wp.blocks;
const {  InspectorControls, BlockControls, BlockDescription } = wp.blocks;

const { PanelBody,PanelRow } = wp.components;

const PLUGIN_TEXTDOMAIN = 'plugin-stat-guten';

const getPluginStatus = ( slug )=>{


    const url = 'http://api.wordpress.org/stats/plugin/1.0/downloads.php?slug='+ slug+'&limit=365';

    $.ajax( {
        type: "GET",
        url: url,
        crossDomain : true,

    } )
        .done(function( data ) {

            console.log( data );
            console.log( "success" );

        return data;
        })
        .fail(function( error) {
            console.log( "error" + error );
        })
        .always(function() {
            console.log( "complete" );
        });


};

registerBlockType( 'inline-status-block/plugin',{
  //title of the Block
  title : __( 'Plugin Stat',  PLUGIN_TEXTDOMAIN ),
  // description of the block ( OPTIONAL )
  description : __(' This block will Show Statistic About the Plugin.' , PLUGIN_TEXTDOMAIN),
  //icon for block
  icon : 'location-alt',
  //category
  category: 'common',
  keywords:[
    __( 'Plugin', PLUGIN_TEXTDOMAIN ),
    __( 'Stat', PLUGIN_TEXTDOMAIN ),
    __( 'History', PLUGIN_TEXTDOMAIN ),
  ],

  //attributres

    attributes: {
       plugin_status_slug: {
            type: 'string',
       },
        content:{
           default:'dffdss'
        }
    },

    edit: props => {
        console.log( props );
        const onSlugChange =( event ) => {

            props.setAttributes(  { plugin_status_slug : event.target.value} );

           if(  props.attributes.plugin_status_slug.length !== 0 ){
             var data= getPluginStatus( props.attributes.plugin_status_slug );

             props.setAttributes({ content: data});
           }
        };
        return ( [ !! props.focus && (
                <InspectorControls key="inspector">


                    <PanelBody title={ __( 'Plugin Statistic Settings' ) }
                    >

                        <PanelRow>
                            <label
                                htmlFor="high-contrast-form-toggle"
                                className="blocks-base-control__label"
                            >
                                { __( 'Plugin Slug',  PLUGIN_TEXTDOMAIN ) }
                            </label>
                            <input type="text" value={ props.attributes.plugin_status_slug }
                                   onChange={ onSlugChange }/>
                        </PanelRow>

                    </PanelBody>

                </InspectorControls>
            ),<div className={props.className}>
                { props.attributes.plugin_status_slug}
                {'<br>'}
                {props.attributes.content }

            </div>]

        );
    },
    save: props => {

        return null;
    }



  });

  //
